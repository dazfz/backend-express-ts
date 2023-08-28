import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import app from "../app";

import * as helper from "./test_helper";
import User from "../models/user";
import Object from "../models/object";

let token: string;
beforeEach(async () => {
  await Object.deleteMany({});
  await User.deleteMany({});
  await Object.insertMany(helper.initialObjects);
  const newUser = {
    username: "testuser",
    password: "testpassword",
  };

  // Register the new user
  await request(app).post("/api/users").send(newUser);
  const loginResponse = await request(app)
    .post("/api/login")
    .send({ username: newUser.username, password: newUser.password });

  token = loginResponse.body.token as string;
});

describe("when there is initially some objects saved", () => {
  test("objects are returned as json", async () => {
    await request(app)
      .get("/api/objects")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all objects are returned", async () => {
    const response = await request(app).get("/api/objects");

    expect(response.body).toHaveLength(helper.initialObjects.length);
  });

  test("a specific object is within the returned objects", async () => {
    const response = await request(app).get("/api/objects");

    const objects: { name: string }[] = response.body as {
      id: string;
      name: string;
    }[];
    const names = objects.map((obj) => obj.name);

    expect(names).toContain("test1");
  });
});

describe("viewing a specific object", () => {
  test("a specific object can be viewed", async () => {
    const objectsAtStart = await helper.objectsInDb();

    const objectToView = objectsAtStart[0];

    const resultObject = await request(app)
      .get(`/api/objects/${objectToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultObject.body).toEqual(objectToView);
  });

  test("fails with statuscode 404 if object does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    await request(app).get(`/api/objects/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await request(app).get(`/api/objects/${invalidId}`).expect(400);
  });
});

describe("addition of a new object", () => {
  test("a valid object can be added", async () => {
    const newObject = {
      name: "test",
    };

    await request(app)
      .post("/api/objects")
      .set("Authorization", `bearer ${token}`)
      .send(newObject)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const objectsAtEnd = await helper.objectsInDb();
    expect(objectsAtEnd).toHaveLength(helper.initialObjects.length + 1);

    const names = objectsAtEnd.map((n) => n.name);
    expect(names).toContain("test");
  });

  test("fails with status code 400 if data invalid", async () => {
    const newObject = {
      any: "test",
    };

    await request(app)
      .post("/api/objects")
      .set("Authorization", `bearer ${token}`)
      .send(newObject)
      .expect(400);

    const objectsAtEnd = await helper.objectsInDb();
    expect(objectsAtEnd).toHaveLength(helper.initialObjects.length);
  });
});

describe("deletion of a object", () => {
  test("a object can be deleted", async () => {
    const objectToDelete = {
      name: "delete",
    };

    const addResponse = await request(app)
      .post("/api/objects")
      .set("Authorization", `bearer ${token}`)
      .send(objectToDelete)
      .expect(201);

    const addedObject: { id: string } = addResponse.body as { id: string };

    await request(app)
      .delete(`/api/objects/${addedObject.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "user",
      password: "password",
    };

    await request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();
    console.log(usersAtStart);
    const newUser = {
      username: "root",
      password: "password",
    };

    const result = await request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

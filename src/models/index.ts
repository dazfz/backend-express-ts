import MyObject from "./object";
import User from "./user";

User.hasMany(MyObject);
MyObject.belongsTo(User);

// Temp
void MyObject.sync({ alter: true });
void User.sync({ alter: true });

export { MyObject, User };

# Backend Express + TypeScript + MongoDB Boilerplate

![My Skills](https://skillicons.dev/icons?i=nodejs,express,ts,mongodb,jest)

Node.js + Express + TypeScript + MongoDB boilerplate for building REST APIs. The boilerplate incorporates MongoDB Atlas for database management and Mongoose for handling database operations. Jest has been integrated for testing purposes.

If you prefer a version of the boilerplate without MongoDB integration, you can find it at: [Backend Express TypeScript Boilerplate](https://github.com/dazfz/backend-express-ts)

## Features

- **MongoDB Setup**: Utilizes `Mongoose` to establish a MongoDB connection with a predefined basic object and user schema.
- **Authentication**: Implements token-based user authentication with `jsonwebtoken`.
- **Testing**: Includes comprehensive Jest tests with built-in support for API testing using `Supertest`.

## Instructions

To get started with this project, follow these steps:

1. **Clone the Repository**: Begin by cloning the repository to your local machine:

   ```bash
   git clone git@github.com:dazfz/backend-express-ts.git
   cd backend-express-ts
   git checkout mongodb
   ```

2. **Installation**: Install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Configuration**: Adjust the configuration settings in the `.env` file to align with your specific requirements.

4. **Development Server**: Initiate the development server:

   ```bash
   npm run dev
   ```

5. **Production Build**: For production deployment, create a production build:

   ```bash
   npm run tsc
   ```

   This will generate a production build within the `build` directory.

6. **Start Production Server**: Launch the production server:

   ```bash
   npm start
   ```

7. **Testing**: Execute tests using the following command:

   ```bash
   npm test
   ```

## Additional Packages

### Production:

- **bcrypt**: Used for enhancing password security through hashing.
- **cross-env**: Facilitates cross-platform environment variable configuration.
- **express-async-errors**: Streamlines error handling within asynchronous Express code.
- **jsonwebtoken**: Enables token generation for authentication.
- **mongoose**: MongoDB object modeling tool.
- **mongoose-unique-validator**: Provides validation for unique fields in Mongoose schemas.

### Development:

- **jest**: Testing framework.
- **supertest**: A utility for testing HTTP assertions.
- **ts-jest**: Enables TypeScript support within Jest.
- **@types/bcrypt**: TypeScript type definitions for bcrypt.
- **@types/jest**: TypeScript type definitions for Jest.
- **@types/jsonwebtoken**: TypeScript type definitions for jsonwebtoken.
- **@types/mongoose-unique-validator**: TypeScript type definitions for mongoose-unique-validator.
- **@types/supertest**: TypeScript type definitions for supertest.

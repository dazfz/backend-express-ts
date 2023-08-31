# Express + TypeScript + PostgreSQL Backend Boilerplate (WIP)

![Skills](https://skillicons.dev/icons?i=nodejs,express,typescript,postgres)

Node.js + Express + TypeScript + PostgreSQL boilerplate for building REST APIs.

If you're interested in using MongoDB, check out the [MongoDB branch](https://github.com/dazfz/backend-express-ts/tree/mongodb).

If you prefer a version of the boilerplate without PostgreSQL integration, you can find it at: [Backend Express TypeScript Boilerplate](https://github.com/dazfz/backend-express-ts)

## Features

- **sequelize pg**:
- **Authentication**: Implements token-based user authentication with `jsonwebtoken`.

## Getting Started

1. **Clone the Repository:** Begin by cloning the repository to your local machine:

   ```bash
   git clone git@github.com:dazfz/backend-express-ts.git
   cd backend-express-ts
   git checkout postgres
   rm -rf .git
   ```

2. **Install Dependencies:** Install the required dependencies using npm:

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

## Additional Packages

### Production:

- **jsonwebtoken**: Enables token generation for authentication.
- **pg**:
- **sequelize**:

### Development:

- **@types/jsonwebtoken**: TypeScript type definitions for jsonwebtoken.
- **@types/pg**: TypeScript type definitions for pg.
- **@types/sequelize**: TypeScript type definitions for sequelize.

# Backend Express + TypeScript Boilerplate

Node.js + Express + TypeScript boilerplate for building REST APIs.

## Instructions

1. Install the required dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. For production build:

   ```bash
   npm run tsc
   ```

   This will create a production build in the `build` directory.

4. Then, start the production server:
   ```bash
   npm start
   ```

## Packages

### Production:

- **express**: Backend framework.
- **cors**: Cross-origin resource sharing. Required if the frontend and backend run on different ports.
- **dotenv**: Loads environment variables from a `.env` file.

### Development:

- **ts-node**: TypeScript execution environment for Node.js. Not strictly required, but useful for running TypeScript code directly.
- **typescript**: TypeScript language support.
- **ts-node-dev**: Auto-reloading for TypeScript files, similar to `nodemon`.
- **eslint**: Linting tool for identifying and enforcing code style. Not required.
- **@typescript-eslint/eslint-plugin**: TypeScript-specific ESLint rules.
- **@typescript-eslint/parser**: Parser that allows ESLint to lint TypeScript code.
- **morgan**: HTTP request logger middleware. Useful for development and debugging, not required in all cases.
- **@types/express**: Type definitions for Express.js.
- **@types/cors**: Type definitions for the cors package.
- **@types/morgan**: Type definitions for the morgan logger.

## Project Directories

- **build:** This directory contains the production build of the backend.
- **dist:** Here, you can find the production build of the frontend.
- **requests:** This directory includes request files that are used for testing the API with the Visual Studio Code (VSCode) `Rest Client` extension.

- **src:**
  - **models:** Contains the models related to the objects.
  - **routes:** Defines the API routes for the objects.
  - **services:** Houses the object-related services.
  - **test:** This directory is intended for storing test-related files.
  - **utils:** Provides utility modules such as configuration middleware, logger, and more.

EXPENSE TRACKER FRONTEND:

This is the frontend user interface for the Expense Tracker application built with React.

## Technology Stack

- React 18 for the user interface
- Redux for state management
- React Redux for connecting React with Redux
- Axios for making HTTP requests to the backend
- React DatePicker for date selection
- React Select for dropdown components

Setup:

1. Install the required dependencies:  npm install --legacy-peer-deps (use node v20)

2. Make sure the backend server is running on port 5000 (the frontend is configured to proxy requests to this port).

3. Start the development server:   npm run dev

4. Open your browser and navigate to http://localhost:3000 to view the application.

EXPENSE TRACKER BACKEND

This is the backend API for the Expense Tracker application built with Node.js and Express.

## Technology Stack

- Node.js with Express framework
- MySQL database with mysql2 driver
- CORS middleware for cross-origin requests
- Express Validator for input validation
- dotenv for environment variable management

SETUP Database: 

Step 1 : mysql -u root -p
Here initally we need run the above script we will be inside mysql terminal

Step 2 : after than do this

        "source schema.sql"


Setup: 

1. Install the required dependencies: npm install (use node v20)

2. Create a `.env` file in the backend directory with your database configuration:
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=expense_tracker
   PORT=5000

3. Set up the MySQL database by running the schema.sql file to create the necessary tables.

4. Start the development server:   npm run dev

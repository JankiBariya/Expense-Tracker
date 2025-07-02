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

1. Install the required dependencies: npm install

2. Create a `.env` file in the backend directory with your database configuration:
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=expense_tracker
   PORT=5000

3. Set up the MySQL database by running the schema.sql file to create the necessary tables.

4. Start the development server:   npm run dev

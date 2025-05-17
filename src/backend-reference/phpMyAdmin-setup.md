
# Setting up phpMyAdmin with Node.js and MySQL

This guide will help you set up phpMyAdmin with your Node.js backend for the Walls Ice Cream World application.

## Prerequisites

1. XAMPP or WAMP installed (which includes phpMyAdmin)
2. Node.js installed
3. Basic knowledge of MySQL and Express.js

## Step 1: Set up MySQL Database

1. Start XAMPP/WAMP and ensure MySQL service is running
2. Open phpMyAdmin (usually at http://localhost/phpmyadmin)
3. Create a new database named `ice_cream_db`
4. You can manually create the `ice_creams` table or let the Node.js server create it automatically:

```sql
CREATE TABLE `ice_creams` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company` VARCHAR(100) NOT NULL,
  `type` VARCHAR(50),
  `size` VARCHAR(50),
  `price` DECIMAL(10,2) NOT NULL,
  `flavour` VARCHAR(100),
  `color` VARCHAR(30),             -- HEX or CSS name
  `expire_date` DATE,
  `images` JSON,
  `is_popular` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Step 2: Set up Node.js Backend

1. Create a new directory for your backend project
2. Navigate to the directory in your terminal
3. Initialize a new Node.js project:
   ```
   npm init -y
   ```
4. Install required dependencies:
   ```
   npm install express mysql2 cors body-parser
   ```
5. Copy the code from `server.js` in the `backend-reference` folder to your project
6. Update the database connection details in `server.js` if needed
7. Start your server:
   ```
   node server.js
   ```

## Step 3: Connect Frontend to Backend

1. In your Lovable project, update the `API_URL` in `src/api/iceCreamApi.ts` to point to your Node.js server (default is http://localhost:5000/api)
2. Set `useMockData` to `false` to use the real API:
   ```javascript
   iceCreamApi.setUseMockData(false);
   ```

## Step 4: Test the Connection

1. Make sure both your Node.js server and the Lovable project are running
2. Try adding a new ice cream through the application
3. Check phpMyAdmin to see if the data was successfully added to the database

## Step 5: Managing Your Database with phpMyAdmin

1. You can use phpMyAdmin to:
   - View all records in your `ice_creams` table
   - Manually add, edit, or delete records
   - Export/import data
   - Run custom SQL queries
   - Monitor database performance

## Troubleshooting

- **CORS errors**: Make sure the CORS middleware is correctly set up in your Node.js server
- **Connection refused**: Ensure MySQL is running and your connection details are correct
- **Database errors**: Check phpMyAdmin for any database errors or constraints
- **API errors**: Use tools like Postman to test your API endpoints independently

## Additional Notes

- For production, you'll need to set up proper security measures, including:
  - Environment variables for sensitive information
  - Authentication for API endpoints
  - HTTPS for secure connections
- Consider implementing a connection pool for better performance with multiple users
- Add proper error logging and monitoring for production environments

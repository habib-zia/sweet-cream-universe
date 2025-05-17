
/**
 * REFERENCE FILE - This is a sample Express server for your external backend
 * This file is not used in the Lovable project and is provided as a reference
 * for when you set up your external Node.js server
 */

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change to your MySQL username
  password: '', // Change to your MySQL password
  database: 'ice_cream_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create database table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS ice_creams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    type VARCHAR(50),
    size VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    flavour VARCHAR(100),
    color VARCHAR(30),
    expire_date DATE,
    images JSON,
    is_popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);

// Routes

// GET all ice creams
app.get('/api/ice-creams', (req, res) => {
  db.query('SELECT * FROM ice_creams', (err, results) => {
    if (err) {
      console.error('Error fetching ice creams:', err);
      return res.status(500).json({ error: 'Failed to fetch ice creams' });
    }
    
    // Parse JSON images field
    const iceCreams = results.map(item => ({
      ...item,
      images: JSON.parse(item.images || '[]')
    }));
    
    res.json(iceCreams);
  });
});

// GET popular ice creams
app.get('/api/ice-creams/popular', (req, res) => {
  db.query('SELECT * FROM ice_creams WHERE is_popular = 1', (err, results) => {
    if (err) {
      console.error('Error fetching popular ice creams:', err);
      return res.status(500).json({ error: 'Failed to fetch popular ice creams' });
    }
    
    // Parse JSON images field
    const iceCreams = results.map(item => ({
      ...item,
      images: JSON.parse(item.images || '[]')
    }));
    
    res.json(iceCreams);
  });
});

// GET ice cream by id
app.get('/api/ice-creams/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM ice_creams WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(`Error fetching ice cream with id ${id}:`, err);
      return res.status(500).json({ error: 'Failed to fetch ice cream' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Ice cream not found' });
    }
    
    // Parse JSON images field
    const iceCream = {
      ...results[0],
      images: JSON.parse(results[0].images || '[]')
    };
    
    res.json(iceCream);
  });
});

// POST new ice cream
app.post('/api/ice-creams', (req, res) => {
  const iceCream = req.body;
  
  // Handle images array - convert to JSON string for MySQL
  if (iceCream.images) {
    iceCream.images = JSON.stringify(iceCream.images);
  }
  
  db.query('INSERT INTO ice_creams SET ?', iceCream, (err, result) => {
    if (err) {
      console.error('Error adding ice cream:', err);
      return res.status(500).json({ error: 'Failed to add ice cream' });
    }
    
    // Get the newly added ice cream
    db.query('SELECT * FROM ice_creams WHERE id = ?', [result.insertId], (err, results) => {
      if (err) {
        console.error(`Error fetching ice cream with id ${result.insertId}:`, err);
        return res.status(500).json({ error: 'Failed to fetch new ice cream' });
      }
      
      // Parse JSON images field
      const newIceCream = {
        ...results[0],
        images: JSON.parse(results[0].images || '[]')
      };
      
      res.status(201).json(newIceCream);
    });
  });
});

// PUT (update) ice cream
app.put('/api/ice-creams/:id', (req, res) => {
  const id = req.params.id;
  const iceCream = req.body;
  
  // Handle images array - convert to JSON string for MySQL
  if (iceCream.images) {
    iceCream.images = JSON.stringify(iceCream.images);
  }
  
  db.query('UPDATE ice_creams SET ? WHERE id = ?', [iceCream, id], (err, result) => {
    if (err) {
      console.error(`Error updating ice cream with id ${id}:`, err);
      return res.status(500).json({ error: 'Failed to update ice cream' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ice cream not found' });
    }
    
    // Get the updated ice cream
    db.query('SELECT * FROM ice_creams WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error(`Error fetching ice cream with id ${id}:`, err);
        return res.status(500).json({ error: 'Failed to fetch updated ice cream' });
      }
      
      // Parse JSON images field
      const updatedIceCream = {
        ...results[0],
        images: JSON.parse(results[0].images || '[]')
      };
      
      res.json(updatedIceCream);
    });
  });
});

// DELETE ice cream
app.delete('/api/ice-creams/:id', (req, res) => {
  const id = req.params.id;
  
  db.query('DELETE FROM ice_creams WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(`Error deleting ice cream with id ${id}:`, err);
      return res.status(500).json({ error: 'Failed to delete ice cream' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ice cream not found' });
    }
    
    res.json({ success: true, message: 'Ice cream deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/**
 * To use this server:
 * 1. Set up a Node.js environment outside of Lovable
 * 2. Create a new folder for your backend
 * 3. Copy this file
 * 4. Run 'npm init -y' to create a package.json
 * 5. Install dependencies: npm install express mysql2 cors body-parser
 * 6. Create a MySQL database named 'ice_cream_db'
 * 7. Run 'node server.js' to start the server
 * 8. Change the API_URL in your Lovable frontend to point to this server
 */

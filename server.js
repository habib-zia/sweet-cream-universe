import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

// Configure CORS - more permissive for development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// Preflight requests
app.options('*', cors());

// Parse JSON bodies
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Test route to check if server is running
app.get('/api/test', (req, res) => {
  res.json({ message: 'API server is running' });
});

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ice_cream_db'
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
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
  `, (tableErr) => {
    if (tableErr) {
      console.error('Error creating table:', tableErr);
    } else {
      console.log('Database table is ready');
    }
  });
});

// GET all ice creams
app.get('/api/ice-creams', (req, res) => {
  db.query('SELECT * FROM ice_creams', (err, results) => {
    if (err) {
      console.error('Error fetching ice creams:', err);
      return res.status(500).json({ error: 'Failed to fetch ice creams' });
    }
    
    try {
      // Parse JSON images field and convert price to number
      const iceCreams = results.map(item => ({
        ...item,
        price: parseFloat(item.price),
        images: JSON.parse(item.images || '[]')
      }));
      
      res.json(iceCreams);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Error processing data' });
    }
  });
});

// GET popular ice creams
app.get('/api/ice-creams/popular', (req, res) => {
  db.query('SELECT * FROM ice_creams WHERE is_popular = 1', (err, results) => {
    if (err) {
      console.error('Error fetching popular ice creams:', err);
      return res.status(500).json({ error: 'Failed to fetch popular ice creams' });
    }
    
    try {
      // Parse JSON images field and convert price to number
      const iceCreams = results.map(item => ({
        ...item,
        price: parseFloat(item.price),
        images: JSON.parse(item.images || '[]')
      }));
      
      res.json(iceCreams);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Error processing data' });
    }
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
    
    try {
      // Parse JSON images field and convert price to number
      const iceCream = {
        ...results[0],
        price: parseFloat(results[0].price),
        images: JSON.parse(results[0].images || '[]')
      };
      
      res.json(iceCream);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Error processing data' });
    }
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
      
      try {
        // Parse JSON images field and convert price to number
        const newIceCream = {
          ...results[0],
          price: parseFloat(results[0].price),
          images: JSON.parse(results[0].images || '[]')
        };
        
        res.status(201).json(newIceCream);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ error: 'Error processing data' });
      }
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
      
      try {
        // Parse JSON images field and convert price to number
        const updatedIceCream = {
          ...results[0],
          price: parseFloat(results[0].price),
          images: JSON.parse(results[0].images || '[]')
        };
        
        res.json(updatedIceCream);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ error: 'Error processing data' });
      }
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
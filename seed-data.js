import mysql from 'mysql2';

// Sample data to seed
const iceCreams = [
  {
    company: "Walls",
    type: "Cup",
    size: "Medium",
    price: 120.00,
    flavour: "Chocolate Chip",
    color: "#7D4C92",
    expire_date: "2025-08-01",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1629385084901-d41c354d3d20?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563974074-5776a21a396c?q=80&w=2070&auto=format&fit=crop"
    ]),
    is_popular: true
  },
  {
    company: "Walls",
    type: "Cone",
    size: "Large",
    price: 150.00,
    flavour: "Vanilla Bean",
    color: "#FEDB39",
    expire_date: "2025-07-15",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=987&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1538489949601-cbf7d82e4e16?q=80&w=1972&auto=format&fit=crop"
    ]),
    is_popular: true
  },
  {
    company: "Walls",
    type: "Stick",
    size: "Small",
    price: 80.00,
    flavour: "Strawberry",
    color: "#3BACB6",
    expire_date: "2025-06-30",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?q=80&w=1812&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633933358116-a27b902fad35?q=80&w=1974&auto=format&fit=crop"
    ]),
    is_popular: false
  },
  {
    company: "Walls",
    type: "Tub",
    size: "Large",
    price: 250.00,
    flavour: "Mint Chocolate",
    color: "#82DBD8",
    expire_date: "2025-09-15",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2127&auto=format&fit=crop"
    ]),
    is_popular: true
  },
  {
    company: "Walls",
    type: "Cup",
    size: "Medium",
    price: 140.00,
    flavour: "Cookie Dough",
    color: "#BFDB38",
    expire_date: "2025-08-20",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?q=80&w=1988&auto=format&fit=crop"
    ]),
    is_popular: false
  },
  {
    company: "Walls",
    type: "Cone",
    size: "Small",
    price: 95.00,
    flavour: "Caramel Swirl",
    color: "#FFBB5C",
    expire_date: "2025-07-05",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1612639267275-7c4ae6a12d84?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563974670-b5181b459b30?q=80&w=1974&auto=format&fit=crop"
    ]),
    is_popular: true
  }
];

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
    process.exit(1);
  }
  console.log('Connected to MySQL database');
  
  // Begin seeding data
  seedData();
});

// Function to seed data
function seedData() {
  // First check if there's any data already in the table
  db.query('SELECT COUNT(*) as count FROM ice_creams', (err, results) => {
    if (err) {
      console.error('Error checking existing data:', err);
      process.exit(1);
    }
    
    const count = results[0].count;
    if (count > 0) {
      console.log(`Database already has ${count} ice cream entries. Skipping seed.`);
      process.exit(0);
    }
    
    // Insert each ice cream
    let inserted = 0;
    
    iceCreams.forEach(iceCream => {
      db.query('INSERT INTO ice_creams SET ?', iceCream, (err) => {
        if (err) {
          console.error('Error inserting ice cream:', err);
          return;
        }
        
        inserted++;
        console.log(`Inserted ice cream: ${iceCream.flavour}`);
        
        // Check if all items are inserted
        if (inserted === iceCreams.length) {
          console.log('All ice creams have been seeded successfully!');
          process.exit(0);
        }
      });
    });
  });
} 
const express = require('express');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
  if (err) return console.error('Database connection failed:', err);
  console.log('Connected to SQLite database.');
});

// Create tables if not exist
const initDB = () => {
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    instructor TEXT,
    duration TEXT,
    description TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS instructors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    specialization TEXT,
    experience TEXT,
    bio TEXT,
    image TEXT
  )`);
};
initDB();

// === Page routes ===
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/courses', (req, res) => {
  db.all('SELECT * FROM courses', [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('courses', { courses: rows });
  });
});


app.get('/instructors', (req, res) => {
  db.all('SELECT * FROM instructors', [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('instructors', { instructors: rows });
  });
});

app.get('/faq', (req, res) => {
  res.render('faq');
});


app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/quiz', (req, res) => {
  res.render('quiz');
});


// === API endpoints ===

app.get('/api/courses', (req, res) => {
  db.all('SELECT id, name, instructor, duration, description, image FROM courses', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve courses' });
    res.json(rows);
  });
});

app.get('/api/instructors', (req, res) => {
  db.all('SELECT name, specialization, experience, bio, image, email FROM instructors', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.json({ success: false, error: 'Missing fields' });

  const messagesFile = path.join(__dirname, 'messages.json');
  const newMessage = { name, email, subject, message, date: new Date().toISOString() };

  fs.readFile(messagesFile, 'utf8', (err, data) => {
    let messages = [];
    if (!err && data) {
      try {
        messages = JSON.parse(data);
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    }

    messages.push(newMessage);
    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), err => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

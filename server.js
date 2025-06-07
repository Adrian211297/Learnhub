const express = require('express');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database connection
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
  if (err) return console.error('Database connection failed:', err);
  console.log('Connected to SQLite database.');
});

// Create all necessary tables if not exist
const initDB = () => {
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    instructor TEXT,
    duration TEXT,
    description TEXT,
    image TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS instructors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    specialization TEXT,
    experience TEXT,
    bio TEXT,
    email TEXT,
    image TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS live_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    date TEXT,
    time TEXT,
    instructor TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS faq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT,
    answer TEXT
  )`);
};

initDB();

// === ROUTES ===

// Homepage with live sessions
app.get('/', (req, res) => {
  db.all('SELECT * FROM live_sessions', [], (err, rows) => {
    if (err) return res.status(500).send('Internal Server Error');
    res.render('index', { liveSessions: rows });
  });
});

// Courses page
app.get('/courses', (req, res) => {
  db.all('SELECT * FROM courses', [], (err, rows) => {
    if (err) return res.status(500).send('Internal Server Error');
    res.render('courses', { courses: rows });
  });
});

// Instructors page
app.get('/instructors', (req, res) => {
  db.all('SELECT * FROM instructors', [], (err, rows) => {
    if (err) return res.status(500).send('Internal Server Error');
    res.render('instructors', { instructors: rows });
  });
});

// FAQ page
app.get('/faq', (req, res) => {
  db.all('SELECT * FROM faq', [], (err, rows) => {
    if (err) return res.status(500).send('Internal Server Error');
    res.render('faq', { faq: rows });
  });
});

// Contact page
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Quiz page
app.get('/quiz', (req, res) => {
  res.render('quiz');
});

// API endpoints (optional)
app.get('/api/courses', (req, res) => {
  db.all('SELECT * FROM courses', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

app.get('/api/instructors', (req, res) => {
  db.all('SELECT * FROM instructors', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

app.get('/api/live-sessions', (req, res) => {
  db.all('SELECT * FROM live_sessions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

app.get('/api/faq', (req, res) => {
  db.all('SELECT * FROM faq', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

// Contact form endpoint (optional for now)
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.json({ success: false, error: 'Missing fields' });

  const messagesFile = path.join(__dirname, 'messages.json');
  const newMessage = { name, email, subject, message, date: new Date().toISOString() };

  fs.readFile(messagesFile, 'utf8', (err, data) => {
    let messages = [];
    if (!err && data) {
      try { messages = JSON.parse(data); } catch (e) { console.error(e); }
    }
    messages.push(newMessage);
    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), err => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    });
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Server start
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
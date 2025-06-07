# LearnHub 🎓

Welcome to **LearnHub** – a simple and modern Online Learning Platform developed as part of a university project.  
The platform provides course listings, instructor profiles, a contact form, FAQ, and an interactive course quiz!

---

## 🌟 Features

- 📚 Browse available **Courses** with detailed information.
- 👩‍🏫 Meet the **Instructors** with bios, specializations, experience and contact emails.
- ❓ Read through the **FAQ** section to quickly find answers.
- ✉️ Use the **Contact** form to send queries directly.
- 🧠 Play a fun **Course Quiz** to test your knowledge.
- 🌙 **Light/Dark Mode** toggle for a better user experience.
- 📅 Upcoming **Live Sessions & Events** displayed on the homepage.
- ⚡ AJAX-powered **dynamic search** and **load more** options.

---

## 📂 Project Structure

```plaintext
Submission/
│
├── public/
│   ├── images/         # Images for instructors, background, and course cards
│   ├── js/             # JavaScript files (quiz.js, main.js, etc.)
│   └── style.css       # Main styling file
│
├── views/
│   ├── partials/       # EJS partials (header.ejs, footer.ejs)
│   ├── index.ejs       # Homepage
│   ├── courses.ejs     # Courses page
│   ├── instructors.ejs # Instructors page
│   ├── faq.ejs         # FAQ page
│   ├── contact.ejs     # Contact page
│   ├── quiz.ejs        # Quiz page
│   └── 404.ejs         # 404 error page
│
├── database.db         # SQLite3 database
├── messages.json       # Contact form submissions
├── server.js           # Main Express server file
├── package.json        # NPM project file
└── README.md           # (This file)

🔧 Tech Stack
HTML5

CSS3

JavaScript (ES6) — Client Side

Node.js + Express.js — Server Side

SQLite3 — Database

EJS — Templating Engine

AJAX — Dynamic content loading

⚙️ Setup Instructions
Clone the repository:
git clone https://github.com/Adrian211297/Learnhub
cd learnhub
Install dependencies:
npm install
Start the server:
npm start
Visit in your browser:
http://localhost:5000
📜 License
This project is for educational purposes only — no commercial use.
Created as a submission for the Web Technologies module (QHO431).

✨ Acknowledgements
Special thanks to Solent University 🚀

Instructor: Muhammad Ibrahim

Icons: FontAwesome

Stock images from Pexels


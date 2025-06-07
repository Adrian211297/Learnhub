document.addEventListener('DOMContentLoaded', () => {
    let courses = [];
    let score = 0;
    let currentQuestion = 0;
    const maxQuestions = 6;
    let quizQuestions = [];

    const descriptionEl = document.getElementById('description');
    const optionsEl = document.getElementById('options');
    const scoreEl = document.getElementById('score');
    const counterEl = document.getElementById('question-counter');
    // Create feedback message
    const feedbackEl = document.createElement('p');
    feedbackEl.id = 'feedback';
    feedbackEl.style.marginTop = '1rem';
    feedbackEl.style.fontWeight = 'bold';
    descriptionEl.parentElement.appendChild(feedbackEl);

    // Create result modal
    const modal = document.createElement('div');
    modal.id = 'quiz-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = 'white';
    modal.style.padding = '2rem';
    modal.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    modal.style.zIndex = '1000';
    modal.style.borderRadius = '10px';
    modal.style.textAlign = 'center';
    modal.style.maxWidth = '400px';
    document.body.appendChild(modal);

    // Fetch courses from the API
    fetch('/api/courses')
        .then(res => res.json())
        .then(data => {
            courses = data.filter(course => course.description && course.description.length > 10);
            for (let i = 0; i < maxQuestions; i++) {
                const randomCourse = courses[Math.floor(Math.random() * courses.length)];
                const questionType = 'description';
                quizQuestions.push({ course: randomCourse, type: questionType });
            }
            nextQuestion();
        });

    function nextQuestion() {
        if (currentQuestion >= maxQuestions) {
            endQuiz();
            return;
        }

        feedbackEl.textContent = '';
        counterEl.textContent = `Question ${currentQuestion + 1} of ${maxQuestions}`;
        optionsEl.innerHTML = '';
        const { course, type } = quizQuestions[currentQuestion];
        const correctName = course.name;

        descriptionEl.textContent = `Q${currentQuestion + 1}: Which course matches this description? "${trimText(course.description)}"`;

        const shuffled = shuffle([...getRandomOptions(correctName), correctName]);

        shuffled.forEach(name => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.style.margin = '0.5rem';
            btn.textContent = name;
            btn.disabled = false;
            btn.onclick = () => handleAnswer(btn, name === correctName, correctName, course);
            optionsEl.appendChild(btn);
        });
    }

    function handleAnswer(clickedBtn, isCorrect, correctAnswer, course) {
        const buttons = optionsEl.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.style.backgroundColor = '#2ecc71'; // green
            } else if (btn !== clickedBtn) {
                btn.style.backgroundColor = '#e74c3c'; // red
            }
        });

        if (isCorrect) {
            score++;
            scoreEl.textContent = score;
            feedbackEl.textContent = `✅ Correct! "${course.name}" is the right answer.`;
            feedbackEl.style.color = '#2ecc71';
        } else {
            clickedBtn.style.backgroundColor = '#e74c3c';
            feedbackEl.textContent = `❌ Oops! The correct answer was "${course.name}".`;
            feedbackEl.style.color = '#e74c3c';
        }

        setTimeout(() => {
            currentQuestion++;
            nextQuestion();
        }, 1500);
    }

    function trimText(text) {
        return text.length > 100 ? text.substring(0, 100) + '...' : text;
    }

    function getRandomOptions(exclude) {
        const names = courses.map(c => c.name).filter(name => name !== exclude);
        const shuffled = shuffle(names).slice(0, 3);
        return shuffled;
    }

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function endQuiz() {
        optionsEl.innerHTML = '';
        descriptionEl.textContent = '';
        counterEl.textContent = '';
        feedbackEl.textContent = '';

        if (score === maxQuestions) {
            modal.innerHTML = `
              <h2>🏆 Perfect Score!</h2>
              <p>You got all ${maxQuestions} questions right!</p>
              <p>You are a LearnHub Master!</p>
              <img src="https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif" alt="celebration" style="max-width: 100%; border-radius: 10px; margin-top: 1rem;">
              <br><br>
              <button onclick="location.reload()" class="btn">Play Again</button>
            `;
        } else {
            modal.innerHTML = `
              <h2>Quiz Complete!</h2>
              <p>Your score: ${score}/${maxQuestions}</p>
              <p>Good try! Want to try again?</p>
              <button onclick="location.reload()" class="btn">Play Again</button>
            `;
        }
        modal.style.display = 'block';
    }
});
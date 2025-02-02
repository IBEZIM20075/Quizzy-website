document.addEventListener('DOMContentLoaded', () => {
  const quizContainer = document.getElementById('quiz-container');
  const submitButton = document.getElementById('submit-button');
  const resultContainer = document.getElementById('result-container');
  const scoreDisplay = document.getElementById('score');
  const feedbackDisplay = document.getElementById('feedback');
  const restartButton = document.getElementById('restart-button');
  const timerDisplay = document.getElementById('timer');

  let questions = [];
  let score = 0;
  let timertimer;
  const totalQuestions = 20;
  const timeLimit = 6 *60* 1000; // 10 minutes

  // Fetch questions from API
  function fetchQuestions() {
    fetch('https://opentdb.com/api.php?amount=20&type=multiple')
      .then(response => response.json())
      .then(data => {
        questions = data.results;  // Extract the questions from the response
        displayQuestions();
        startTimer();
      })
      .catch(error => console.error('Error fetching questions:', error));
  }

  // Display questions
  function displayQuestions() {
    questions.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('question-card');
      questionElement.innerHTML = `
        <h4>${index + 1}. ${question.question}</h4>
        <ul class="options">
          ${[...question.incorrect_answers, question.correct_answer].map((choice, i) => `
            <li>
              <label>
                <input type="radio" name="question${index}" value="${choice}">
                ${choice}
              </label>
            </li>
          `).join('')}
        </ul>
      `;
      quizContainer.appendChild(questionElement);
    });
  }

  // Start timer
  function startTimer() {
    const endTime = Date.now() + timeLimit;
    timer = setInterval(() => {
      const remainingTime = endTime - Date.now();
      if (remainingTime <= 0) {
        clearInterval(timer);
        submitQuiz();
        timerDisplay.textContent = 'Time Left: 00:00';
        alert('You have exeded your time limit and your quiz has been submitted successfully');
      } else {
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (remainingTime <= 26000) { // 26 seconds in milliseconds
          timerDisplay.style.color = 'red';
        }
      }
    }, 1000);
  }

  // Submit quiz
  function submitQuiz() {
    clearInterval(timer);

    questions.forEach((question, index) => {
      const selectedChoice = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedChoice && selectedChoice.value === question.correct_answer) {
        score++;
      }
    });

    displayResults();
  }

  // Display results
  function displayResults() {
    scoreDisplay.textContent = `Your score: ${score}`;
    feedbackDisplay.innerHTML = score >= totalQuestions / 2 ? 'Good job!' : 'Better luck next time!';
    resultContainer.classList.remove('hidden');
  }

  // Restart quiz
  function restartQuiz() {
    score = 0;
    quizContainer.innerHTML = '';
    resultContainer.classList.add('hidden');
    fetchQuestions();
  }

  submitButton.addEventListener('click', () => {
    const confirmSubmit = confirm("Are you sure you want to submit your quiz?");
    if (confirmSubmit) {
      submitQuiz();
    }
  });

  restartButton.addEventListener('click', restartQuiz);

  // Initial fetch
  fetchQuestions();
});
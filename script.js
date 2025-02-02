document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-button');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score');
    const feedbackContainer = document.getElementById('feedback');
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    quizContainer.insertBefore(timerDisplay,quizContainer.firstChild);

    let timeLeft = 6*70 ; // 6 minutes in seconds
    let timerInterval;

    const questions = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correctAnswer: 'Paris'
        },
        {
            question: 'Who created Quizzy website?',
            options: ['Goodluck', 'kelvin', 'Danielson', 'mark'],
            correctAnswer: 'Danielson'
        },
        {
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
            correctAnswer: 'Mars'
        },
        {
            question: 'Who wrote "To be, or not to be"?',
            options: ['William Shakespeare', 'Charles Dickens', 'Mark Twain', 'Jane Austen'],
            correctAnswer: 'William Shakespeare'
        },
        {
            question: 'What is the term for a group of flamingo?',
            options: ['flamboyance', 'gosses', 'pride', 'peacock'],
            correctAnswer: 'flamboyance'
        },
        {
            question: 'What is the only planet that rotates on its side?',
            options: ['Earth', 'Saturn', 'Uranus', 'Mars'],
            correctAnswer: 'Uranus'
        },
        {
            question: 'What is the world record for the longest hiccupping spree?',
            options: ['68 years', '50 years', '30 years', '20 years'],
            correctAnswer: '68 years'
        },
        {
            question: 'Who is known as the father of the United States and the first president of the country?',
            options: ['Obama', 'George Washington', 'Donald Trump', 'Charlie Ford'],
            correctAnswer: 'George Washington'
        },
        {
            question: 'Who painted the Mona Lisa?',
            options: ['Edward Steven', 'George Chalo', 'Esetin Marcus', 'Leonardo da Vinci'],
            correctAnswer: 'Leonardo da Vinci'
        },
        {
            question: 'What popular ice cream is typically made with crushed cookies?',
            options: ['Black Currant', 'Berry', 'Strawberry', 'Cookies and Cream'],
            correctAnswer: 'Cookies and Cream'
        },
        {
            question: 'What is the name of the largest ocean on Earth?',
            options: ['Pacific Ocean', 'Red Sea', 'Mediterranean Ocean', 'Black Sea'],
            correctAnswer: 'Pacific Ocean'
        },
        {
            question: 'What famous music group was John Lennon a part of before pursuing a solo career?',
            options: ['Afro Music', 'Mara Beat', 'The Beatles', 'Reggie Beat'],
            correctAnswer: 'The Beatles'
        },
        {
            question: 'In the story of Snow White, how many dwarfs are there?',
            options: ['Seven', 'Nine', 'Four', 'Five'],
            correctAnswer: 'Seven'
        },
        {
            question: 'Who is the king of the gods in Greek mythology?',
            options: ['Thor', 'Zeus', 'Saturn', 'Odin'],
            correctAnswer: 'Zeus'
        },
        {
            question: 'What do bees collect to make honey?',
            options: ['Nectar', 'Flowers', 'Pollen Grain', 'Flavor'],
            correctAnswer: 'Nectar'
        },
        {
            question: 'In what galaxy is our solar system located?',
            options: ['Milky Way', 'Solar Zone', 'Space', 'Third Galaxy'],
            correctAnswer: 'Milky Way'
        },
        {
            question: 'Which planet is known as the Blue Planet?',
            options: ['Mars', 'Jupiter', 'Earth', 'Pluto'],
            correctAnswer: 'Earth'
        },
        {
            question: 'Which geometric shape has four equal sides and four right angles?',
            options: ['Square', 'Rectangle', 'Cube', 'Triangle'],
            correctAnswer: 'Square'
        },
        {
            question: 'What is the main ingredient in the dish sushi?',
            options: ['Pepper', 'Rice', 'Cinnamon', 'Pasta'],
            correctAnswer: 'Rice'
        },
               {
            question: 'What is the Name of the Egyptian god of the Sun?',
            options: ['Ra', 'ashemi', 'tur', 'odin'],
            correctAnswer: 'Ra'
        },
        {
            question: 'The roman god of war inspired the name of which planet ?',
            options: ['earth', 'pluto', 'mars', 'jupiter'],
            correctAnswer: 'mars'
        },
        {
            question: 'Thor was the son of which god?',
            options: ['blazer', 'aretemis', 'sartun', 'odin'],
            correctAnswer: 'odin'
        },
        {
            question: 'in a Court room,who is responsible for representing the Government in criminal cases?',
            options: ['prime minister', 'prosecutor', 'vice president', 'lawyer'],
            correctAnswer: 'prosecutor'
        },
        {
            question: 'butch Cassidy was famous for doing what?',
            options: ['robbing', 'stealing', 'exortism', 'kidnaping'],
            correctAnswer: 'stealing'
        },
        {
            question: 'Which mammal have no vocal cords?',
            options: ['Elephant', 'wild horse', 'Giraffe', 'Goat'],
            correctAnswer: 'Giraffe'
        },
        {
            question: 'How long is the gestation period of an African Elephant?',
            options: ['22 months', '10 years', '2 months', '1 year'],
            correctAnswer: '22 months'
        },
        {
            question: 'What is a femal donkey called?',
            options: ['a female donkey', 'a jenny', 'jackie', 'none of the above'],
            correctAnswer: 'a Jenny'
        },
        {
            question: 'what is the fastest land animal in the world?',
            options: ['cheetah', 'lion', 'tiger', 'kangeroo'],
            correctAnswer: 'cheetah'
        },
        {
            question: 'how many eyes do a bee have?',
            options: ['five', 'three', 'two', 'one'],
            correctAnswer: 'five'
        },
        {
            question: 'Which animal symbolizes good luck in Europe ?',
            options: ['laddy bear', 'ladybug', 'butterflies', 'bees'],
            correctAnswer: 'ladybug'
        },
        {
            question: 'who is the richest person in the whole world as of 2021?',
            options: ['Elon musk', 'Bii gate', 'steves job', 'Mark zuckerberg'],
            correctAnswer: 'Elon musk'
        },
        {
            question: 'In what year did Steve jobs died?',
            options: ['2021', '2011', '2019', '2010'],
            correctAnswer: '2011'
        },
        
        
        {
            question: 'Which animal can be seen on the porsche logo?',
            options: ['leopard', 'horse', 'bull', 'cheetah'],
            correctAnswer: 'horse'
        },
        {
            question: 'Larry page is  the ceo of which company?',
            options: ['Goggle', 'Facebook', 'Amazon', 'X-twitter'],
            correctAnswer: 'Goggle'
        },
        {
            question: "What is the capital city of mongolia?",
            options: ["Paris", "ulaanbaatar", "Stanford", "univel"],
            correctAnswer: "ulaanbaatar"
        },
        {
            question: "How many times does the heart beat per day?", options: ["200,000 ", "100,000", "300,000", "400,000"],
            correctAnswer: "100,000"
        },
        {
            question: "how many wives did king henry vii have?",
            options: ["ten", "four", "six", "eight"],
            correctAnswer: "six"
        },
        {
            question: "in which year did Serena Williams win her first grand slam singles tittle?",
            options: ["1999", "2001", "2024", "2000"],
            correctAnswer: "1999"
        },
        {
            question: "in what year and in which city were the first Olympic game held?",
            options: ["1945 America", "1857 france", "1896 Athens, Greece", "1789 Germany"],
            correctAnswer: "1896 Athens, Greece"
        },
        {
            question: "what is the specific term use to describe a type of sandstorm characterized by strong winds carrying a wall of dust and sand, reducing visibility and causing hazardous condition?",
            options: ["haboob", "sand wave", "desert wind", "froge"],
            correctAnswer: "haboob"
        },
        {
            question: "Benjamin Franklin was a key figure in the drafting of the United States constitution, which state did he represent during the constitutional convention in 1787?",
            options: ["Washington", "California", "Pennsylvania", "North Carolina"],
            correctAnswer: "Pennsylvania"
        },
        {
            question: "before founding Facebook, mark zuckerberg created a website that allows users to compare the attractiveness of two people side by side, what is the name of the website?",
            options: ["facemash", "friend star", "the Facebook", "course match"],
            correctAnswer: "facemash"
        },
        {
            question: "what is the capital city of bhutan?",
            options: ["Macedonia", "sultan", "thimphu", "india"],
            correctAnswer: "thimphu"
        },
        {
            question: "who is the greek god of war and sun of Zeus and hera?",
            options: ["Thor", "Ares", "Saturn", "Odin"],
            correctAnswer: "Ares"
        },
        {
            question: "in mathematics, what is the name for a number that is not a prime number and have more than two factors?",
            options: ["composite number", "satictis", "fraction", "multiplication"],
            correctAnswer: "composite number"
        },
        {
            question: "what is the chemical symbol for the element mecury?",
            options: ["hg", "O", "k", "fl"],
            correctAnswer: "hg"
        },
        {
            question: "what is the name of the largest moon on Jupiter?",
            options: ["musc", "Ganymede", "Earth", "satrin"],
            correctAnswer: "Ganymede"
        },
        {
            question: "Which famous play features a character named Romeo?",
            options: ["Juliet", "Romeo and Juliet", "Stanford", "Alexzendra and Romero"],
            correctAnswer: "Romeo and Juliet"
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["Blue Whale", "Octopus", "Ox", "Zebra"],
            correctAnswer: "Blue Whale"
        },
        {
            question: "What is the main ingredient in guacamole?",
            options: ["Avocado", "Cherry", "Pear", "Berry"],
            correctAnswer: "Avocado"
        }
    
    ];

    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitQuiz();
            } else {
                timeLeft--;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                
                // Change timer color when 30 seconds are left
                if (timeLeft <= 30) {
                    timerDisplay.style.backgroundColor = '#ee001d';
                    timerDisplay.style.color = 'white';
                }
            }
        }, 1000);
    }

    function submitQuiz() {
        clearInterval(timerInterval);
        if (timeLeft <= 0) {
            alert("Time's up! Your quiz has been submitted automatically.");
        }
        calculateResults();
    }

    function displayQuiz() {
    questions.forEach((question, index) => {
        const questionCard = document.createElement('div');
        questionCard.classList.add('question-card');
        questionCard.innerHTML = `
            <h4>${index + 1}. ${question.question}</h4>
            <ul class="options">
                ${question.options.map(option => `
                    <li>
                        <label>
                            <input type="radio" name="question${index}" value="${option}">
                            ${option}
                        </label>
                    </li>
                `).join('')}
            </ul>
        `;
        quizContainer.appendChild(questionCard);
    });
}
    function calculateResults() {
        let score = 0;
        let feedback = '';
        questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                if (selectedOption.value === question.correctAnswer) {
                    score++;
                    feedback += `<p class="correct">Question ${index + 1}: Correct! ✅</p>`;
                } else {
                    feedback += `<p class="incorrect">Question ${index + 1}: Incorrect. ❌ You answered: ${selectedOption.value}. Correct answer: ${question.correctAnswer}</p>`;
                }
            } else {
                feedback += `<p class="incorrect">Question ${index + 1}: No answer selected.</p>`;
            }
        });
        scoreDisplay.textContent = `You scored ${score} out of ${questions.length}`;
        feedbackContainer.innerHTML = feedback;
        resultContainer.classList.remove('hidden');
    }

    submitButton.addEventListener('click', () => {
        const confirmSubmit = confirm("Are you sure you want to submit your quiz?");
        if (confirmSubmit) {
            submitQuiz();
        }
    });

    // Create and initialize the restart button
    const restartButton = document.createElement('button');
    restartButton.id = 'restart-button';
    restartButton.textContent = 'Restart Quiz';
    resultContainer.appendChild(restartButton);

    restartButton.addEventListener('click', () => {
        location.reload(); // Reload the page to restart the quiz
    });

    displayQuiz();
    startTimer();
});
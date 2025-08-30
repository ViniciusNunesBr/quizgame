// DOM Elements
/*

Atualizações que faltam:

⚡ Funcionalidades intermediárias
Modo de dificuldade 🎚️
– Fácil, Médio, Difícil (com mais ou menos tempo, mais ou menos perguntas).
Perguntas aleatórias 🔀
– Embaralhar a ordem das perguntas a cada jogo.
Embaralhar respostas 🔁
– Misturar a ordem das alternativas para não decorar pela posição.
Sistema de vidas ❤️
– O jogador tem 3 vidas e perde uma a cada resposta errada.
– O quiz acaba se as vidas acabarem.

🔥 Funcionalidades avançadas

Som e efeitos 🔊
– Efeito sonoro para acerto/erro e tela de vitória.
Modo multiplayer 👥
– Jogar em turnos (Jogador 1 responde, depois Jogador 2, e mostra quem fez mais pontos).
Banco de perguntas externo (JSON) 📂
– Separar as perguntas em um arquivo .json para facilitar atualização.
Temas de design (dark mode, colorido) 🎨
– Botão para trocar entre tema claro e escuro.
Perguntas com imagem 🖼️
– Exibir imagens ou até vídeos na questão (Ex: “De qual filme é essa cena?”).
Pontuação baseada no tempo ⏱️
– Quanto mais rápido responder, mais pontos ganha.

Atualizações 
Funcionalidades adicionadas:

Timer por pergunta ⏳ – 15 segundos para responder cada questão; mostra automaticamente a resposta correta quando o tempo acaba.

Ranking / Melhor pontuação 🏆 – salva e exibe o melhor score usando localStorage.

Feedback imediato 🎉/❌ – mensagem e cor indicando acerto ou erro logo após selecionar a resposta.

Explicação educativa 📘 – mostra um texto explicando a resposta correta após o usuário responder.

Área separada para feedback e explicação – garante que mensagens anteriores não atrapalhem a próxima pergunta.

*/

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const timerSpan = document.getElementById("timer");
const bestScoreSpan= document.getElementById("best-score");

// QUIZ STATE VARS


// Novas variáveis para timer e ranking
let timer; // controla o setInterval
let timeLeft = 15;
let bestScore = localStorage.getItem("bestScore") || 0;

const feedbackDiv = document.getElementById("feedback");
const explanationDiv = document.getElementById("explanation");

//Variables for difficulty:

let currentQuizQuestions = [];

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false }
    ],
    explanation: "Paris is the capital and most populous city of France."
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ],
    explanation: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide."
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true }
    ],
    explanation: "The Pacific Ocean is the largest ocean on Earth, covering about 63 million square miles (165 million km²)."
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false }
    ],
    explanation: "Banana is a fruit, not a programming language."
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false }
    ],
    explanation: "The symbol Au comes from the Latin word 'aurum', meaning gold."
  },
  {
    question: "Which country has the largest population?",
    answers: [
      { text: "India", correct: false },
      { text: "China", correct: true },
      { text: "USA", correct: false },
      { text: "Indonesia", correct: false }
    ],
    explanation: "China is the most populous country in the world, with over 1.4 billion people."
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      { text: "K2", correct: false },
      { text: "Mount Everest", correct: true },
      { text: "Kangchenjunga", correct: false },
      { text: "Lhotse", correct: false }
    ],
    explanation: "Mount Everest has a peak at 8,848 meters (29,029 ft) and is the tallest mountain on Earth."
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Gold", correct: false },
      { text: "Silver", correct: false },
      { text: "Osmium", correct: false }
    ],
    explanation: "'O' stands for Oxygen, which is essential for respiration."
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    answers: [
      { text: "Tiger", correct: false },
      { text: "Elephant", correct: false },
      { text: "Lion", correct: true },
      { text: "Leopard", correct: false }
    ],
    explanation: "The lion is often called the King of the Jungle due to its strength and majesty."
  },
  {
    question: "Which planet is closest to the Sun?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Earth", correct: false },
      { text: "Mercury", correct: true },
      { text: "Mars", correct: false }
    ],
    explanation: "Mercury is the closest planet to the Sun."
  },
  {
    question: "What is the largest desert in the world?",
    answers: [
      { text: "Sahara", correct: false },
      { text: "Arabian", correct: false },
      { text: "Antarctica", correct: true },
      { text: "Gobi", correct: false }
    ],
    explanation: "Antarctica is technically the largest desert due to its low precipitation."
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Leo Tolstoy", correct: false },
      { text: "Mark Twain", correct: false }
    ],
    explanation: "'Romeo and Juliet' is a famous tragedy written by William Shakespeare."
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false }
    ],
    explanation: "Plants absorb carbon dioxide for photosynthesis."
  },
  {
    question: "Which continent is the Sahara Desert located in?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Africa", correct: true },
      { text: "Australia", correct: false },
      { text: "South America", correct: false }
    ],
    explanation: "The Sahara Desert is located in northern Africa."
  },
  {
    question: "What is the boiling point of water at sea level?",
    answers: [
      { text: "90°C", correct: false },
      { text: "100°C", correct: true },
      { text: "110°C", correct: false },
      { text: "120°C", correct: false }
    ],
    explanation: "Water boils at 100°C (212°F) at standard atmospheric pressure."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

let timePerQuestion = 15; // padrão
let numQuestions = quizQuestions.length; 
let selectedDifficulty = null;


document.querySelectorAll(".difficulty-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove seleção anterior
    document.querySelectorAll(".difficulty-btn").forEach(b => b.classList.remove("selected"));

    // Marca o botão clicado
    btn.classList.add("selected");

    // Salva a dificuldade escolhida
    selectedDifficulty = btn.dataset.difficulty;

    if (selectedDifficulty === "easy") {
      timePerQuestion = 20;
      numQuestions = 6;
    } else if (selectedDifficulty === "medium") {
      timePerQuestion = 15;
      numQuestions = 10;
    } else if (selectedDifficulty === "hard") {
      timePerQuestion = 10;
      numQuestions = 15;
    }
  });
});
//QUIZ STATE VARS



totalQuestionsSpan.textContent= quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;


//even listeners

startButton.addEventListener("click", () => {
  if (!selectedDifficulty) {
    alert("Escolha uma dificuldade antes de começar!");
    return;
  }
  startQuiz();
});

restartButton.addEventListener("click",restartQuiz);

function startQuiz()
{

  //reset vars
  currentQuestionIndex=0;
  score=0;
  scoreSpan.textContent=0;

    currentQuizQuestions = quizQuestions
    .sort(() => Math.random() - 0.5)   // embaralha
    .slice(0, numQuestions);   

  // definir perguntas de acordo com dificuldade ou limite
// pega apenas as primeiras 'numQuestions'
  totalQuestionsSpan.textContent = currentQuizQuestions.length;
  maxScoreSpan.textContent = currentQuizQuestions.length;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");


  showQuestion();
}

function showQuestion ()
{
  //reset 
  answersDisabled = false;
  const currentQuestion = currentQuizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent=currentQuestionIndex+1;

  const progressPercent= (currentQuestionIndex/currentQuizQuestions.length)*100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent=currentQuestion.question;

  // ✅ Aqui limpamos feedback + explicação
  feedbackDiv.textContent = "";
  feedbackDiv.className = "feedback"; // volta pro estado padrão (sem 'correct' ou 'incorrect')
  explanationDiv.textContent = "";

  //explain

  answersContainer.innerHTML="";

  currentQuestion.answers.forEach((answer)=>
    {
      const button = document.createElement("button");
      button.textContent=answer.text ;
      button.classList.add("answer-btn");

      button.dataset.correct = answer.correct;

      button.addEventListener("click",selectAnswer);

      answersContainer.appendChild(button)
    }
  );

  startTimer(); // inicia o cronômetro da pergunta

}

function selectAnswer (event){
  //optimization check
  if(answersDisabled) return ;

  answersDisabled=true;

  clearInterval(timer);

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct==="true";
  //todo: explain this in
  Array.from(answersContainer.children).forEach((button)=> {
    if (button.dataset.correct=="true")
    {
      button.classList.add("correct");
    }else if (button === selectedButton)
    {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect)
  {
    score++
    scoreSpan.textContent=score;
    feedbackDiv.textContent = "Boa! Você acertou! 🎉";
    feedbackDiv.classList.add("correct");
  } else 
  {
    feedbackDiv.textContent = "Ops! Resposta errada. ❌";
    feedbackDiv.classList.add("incorrect");

  }

  // 📘 Explicação educativa
  const currentQuestion = quizQuestions[currentQuestionIndex];
  explanationDiv.textContent = currentQuestion.explanation;

  setTimeout(()=>{
    currentQuestionIndex++;

    if(currentQuestionIndex<currentQuizQuestions.length)
    {
      showQuestion()
    }else
    {
      showResults()
    }
  },1000 );

}

function showResults()
{
  quizScreen.classList.remove("active")
  resultScreen.classList.add("active")

  finalScoreSpan.textContent=score;

  if (score>bestScore)
  {
    bestScore=score;
    localStorage.setItem("bestScore",bestScore);
  }

  bestScoreSpan.textContent=bestScore;



  const percentage = (score/quizQuestions.length)*100

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}



function restartQuiz()
{

  currentQuizQuestions = [...quizQuestions]
  .sort(() => Math.random() - 0.5)
  .slice(0, numQuestions);
  

  resultScreen.classList.remove("active");
  startQuiz();


}



//timer

function startTimer()
{
  clearInterval(timer);
  timeLeft=timePerQuestion;
  timerSpan.textContent=timeLeft;

  timer=setInterval(()=>{
    timeLeft--;
    timerSpan.textContent=timeLeft;
    if(timeLeft <=0 )
    {
      clearInterval(timer);
      handleTimeout();

    }
  
  },1000


   );
}

function handleTimeout ()
{
  answersDisabled=true;
  Array.from(answersContainer.children).forEach((button)=>  {
    if (button.dataset.correct=="true")
    {
      button.classList.add("correct");
    }
  }
  );
  setTimeout( ()=> {
    currentQuestionIndex++;
    if(currentQuestionIndex<currentQuizQuestions.length)
    {
      showQuestion();
    }else{
      showResults();
    }

  },1000);
}











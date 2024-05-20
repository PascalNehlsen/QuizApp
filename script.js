let questions = [
  {
    question: 'Wer hat HTML erfunden?',
    answer_1: 'Robbie Williams',
    answer_2: 'Lady Gaga',
    answer_3: 'Tim Berners-Lee',
    answer_4: 'Justin Bieber',
    right_answer: 3,
  },
  {
    question: 'Was bedeutet HTML?',
    answer_1: 'HyperText Markup Language',
    answer_2: 'Home Tool Markup Language',
    answer_3: 'Hyperlinks and Text Markup Language',
    answer_4: 'Hyperlinking Text Marking Language',
    right_answer: 1,
  },
  {
    question:
      'Welches Attribut wird verwendet, um eine eindeutige Kennung für ein HTML-Element festzulegen?',
    answer_1: 'class',
    answer_2: 'id',
    answer_3: 'name',
    answer_4: 'style',
    right_answer: 2,
  },
  {
    question:
      'Welches HTML-Element wird verwendet, um einen Zeilenumbruch ohne zusätzliche Abstände zu erzeugen?',
    answer_1: 'break',
    answer_2: 'linebreak',
    answer_3: 'br',
    answer_4: 'lb',
    right_answer: 3,
  },
  {
    question: 'Welches HTML-Tag wird verwendet, um einen Absatz zu definieren?',
    answer_1: 'paragraph',
    answer_2: 'p',
    answer_3: 'par',
    answer_4: 'pg',
    right_answer: 2,
  },
  {
    question: 'Welches Attribut wird verwendet, um Text in einem textarea-Element zu definieren?',
    answer_1: 'placeholder',
    answer_2: 'value',
    answer_3: 'content',
    answer_4: 'text',
    right_answer: 1,
  },
  {
    question: 'Welches Attribut gibt die Ziel-URL an, wenn ein Link angeklickt wird?',
    answer_1: 'target',
    answer_2: 'href',
    answer_3: 'link',
    answer_4: 'url',
    right_answer: 2,
  },
  {
    question: 'Welches HTML-Element wird verwendet, um einen Link zu definieren?',
    answer_1: 'link',
    answer_2: 'a',
    answer_3: 'href',
    answer_4: 'url',
    right_answer: 2,
  },
  {
    question: 'Wie fügen Sie ein Bild in eine HTML-Seite ein?',
    answer_1: "picture src='image.jpg'",
    answer_2: "img alt='image.jpg'",
    answer_3: "img src='image.jpg' alt='Image'",
    answer_4: "image src='image.jpg'",
    right_answer: 3,
  },
  {
    question:
      'Welches Attribut wird verwendet, um mehrere Optionen in einem Dropdown-Menü zu definieren?',
    answer_1: 'select',
    answer_2: 'option',
    answer_3: 'dropdown',
    answer_4: 'list',
    right_answer: 2,
  },
];

let currentQuestion = 0;
let rightQuestions = 0;
let audioSuccess = new Audio('audio/success.mp3');
let audioFail = new Audio('audio/fail.mp3');
let audioEndscreen = new Audio('audio/winner.mp3');

function render() {
  document.getElementById('questionAmount').innerHTML = questions.length;

  document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
  showQuestion();
}

function showQuestion() {
  let question = questions[currentQuestion];

  document.getElementById('question').innerHTML = question['question'];
  document.getElementById('answer_1').innerHTML = question['answer_1'];
  document.getElementById('answer_2').innerHTML = question['answer_2'];
  document.getElementById('answer_3').innerHTML = question['answer_3'];
  document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question['right_answer']}`;

  if (selectedQuestionNumber == question['right_answer']) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    rightQuestions++;
    audioSuccess.play();
  } else {
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    audioFail.play();
  }
  document.getElementById('answerBtn').disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showEndscreen();
    audioEndscreen.play();
  } else {
    let percent = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').innerHTML = `${percent} %`;
    document.getElementById('progressBar').style.width = `${percent}%`;

    resetBtn();
    render();
  }
}

function showEndscreen() {
  document.getElementById('endScreen').style.display = '';
  document.getElementById('card-body').style.display = 'none';
  document.getElementById('answerBtn').classList.add('d-none');
  document.getElementById('restartBtn').classList.remove('d-none');
  document.getElementById('questionAmountResult').innerHTML = questions.length;
  document.getElementById('correctQuestions').innerHTML = rightQuestions;
}

function resetBtn() {
  document.getElementById('answerBtn').disabled = true;
  document.getElementById('answer_1').parentNode.classList.remove('bg-success');
  document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_2').parentNode.classList.remove('bg-success');
  document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_3').parentNode.classList.remove('bg-success');
  document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_4').parentNode.classList.remove('bg-success');
  document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function restartQuiz() {
  currentQuestion = 0;
  rightQuestions = 0;
  document.getElementById('endScreen').style.display = 'none';
  document.getElementById('card-body').style.display = '';
  document.getElementById('answerBtn').classList.remove('d-none');
  document.getElementById('restartBtn').classList.add('d-none');
  document.getElementById('progressBar').innerHTML = '';
  document.getElementById('progressBar').style.width = `0%`;
  resetBtn();
  render();
}

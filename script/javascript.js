fetch('./json/javascript.json')
  .then((response) => response.json())
  .then((json) => {
    questionsJS = json;
    render();
  })
  .catch((error) => console.error('Error fetching JSON:', error));

let currentQuestion = 0;
let rightQuestions = 0;
let audioSuccess = new Audio('audio/success.mp3');
let audioFail = new Audio('audio/fail.mp3');
let audioEndscreen = new Audio('audio/winner.mp3');

function render() {
  document.getElementById('questionAmount').innerHTML = questionsJS.length;

  document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
  showQuestion();
}

function showQuestion() {
  let question = questionsJS[currentQuestion];

  document.getElementById('question').innerHTML = question['question'];
  document.getElementById('answer_1').innerHTML = question['answer_1'];
  document.getElementById('answer_2').innerHTML = question['answer_2'];
  document.getElementById('answer_3').innerHTML = question['answer_3'];
  document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
  let question = questionsJS[currentQuestion];
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
  if (currentQuestion >= questionsJS.length) {
    showEndscreen();
    audioEndscreen.play();
  } else {
    let percent = ((currentQuestion + 1) / questionsJS.length) * 100;
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
  document.getElementById('questionAmountResult').innerHTML = questionsJS.length;
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

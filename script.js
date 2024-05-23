const quizData = [
  {
    question: "Humanity's future lies in expanding our presence beyond Earth. We should prioritize space exploration and colonization of other planets.",
    answers: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    points: [-2, -1, 0, 1, 2]
  },
  {
    question: "Preserving the natural environment and ecosystems on Earth should be the primary focus of human efforts, even if it means limiting our expansion into space.",
    answers: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    points: [2, 1, 0, -1, -2]
  },
  {
    question: "Technological advancements and scientific discoveries made through space exploration can have significant benefits for life on Earth, such as improved communication, weather forecasting, and resource utilization.",
    answers: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    points: [-2, -1, 0, 1, 2]
  },
  {
    question: "The long-term survival of the human species may depend on our ability to establish permanent settlements on other planets, as Earth's resources and habitable land are limited.",
    answers: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    points: [-2, -1, 0, 1, 2]
  },
  {
    question: "Protecting endangered species and maintaining the delicate balance of Earth's ecosystems should be a top priority, even if it means slowing down or limiting space exploration efforts.",
    answers: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    points: [2, 1, 0, -1, -2]
  },
  {
    question: "The potential benefits of space tourism, such as increased funding for space programs and the democratization of space travel, outweigh the concerns about resource consumption and environmental impact.",
    answers: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    points: [-2, -1, 0, 1, 2]
  },
  {
    question: "Investing in sustainable energy solutions and environmental restoration on Earth should be a higher priority than funding space missions to explore other planets or establish human colonies.",
    answers: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    points: [2, 1, 0, -1, -2]
  },
  {
    question: "The potential for scientific breakthroughs and technological advancements that could benefit humanity as a whole justifies the resources and funding dedicated to space exploration programs.",
    answers: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    points: [-2, -1, 0, 1, 2]
  },
  {
    question: "Humanity's long-term future may depend on our ability to establish a permanent presence on other planets, as Earth's resources and habitable land may become increasingly scarce or threatened by environmental degradation.",
    answers: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    points: [-2, -1, 0, 1, 2]
  },
  {
    question: "Protecting the unique and fragile ecosystems of Earth should be the primary focus of human efforts, even if it means limiting our expansion into space and the exploration of other planets.",
    answers: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    points: [2, 1, 0, -1, -2]
  }
];

const quizForm = document.getElementById('quiz-form');
const submitButton = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');

let earthistPoints = 0;
let spacistPoints = 0;
let isQuizSubmitted = false;
let completedQuestions = 0;
const totalQuestions = quizData.length;

function displayQuestions() {
  quizData.forEach((data, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-container');
    questionDiv.innerHTML = `
      <div class="question">${data.question}</div>
      <div class="answers">
        ${data.answers.map((answer, i) => `<label><input type="radio" name="q${index}" value="${data.points[i]}" onclick="updateCompletedQuestions()">${answer}</label>`).join('')}
      </div>
    `;
    quizForm.appendChild(questionDiv);
  });
}

function updateCompletedQuestions() {
  completedQuestions = document.querySelectorAll('input:checked').length;
}

function calculateResults() {
  if (completedQuestions < totalQuestions) {
    alert('Please answer all the questions before submitting the quiz.');
    return;
  }

  const formData = new FormData(quizForm);

  for (const entry of formData.entries()) {
    if (entry[1] > 0) {
      spacistPoints += parseInt(entry[1]);
    } else if (entry[1] < 0) {
      earthistPoints += Math.abs(parseInt(entry[1]));
    }
  }

  const totalPoints = spacistPoints + earthistPoints;
  const earthistPercentage = ((earthistPoints / totalPoints) * 100).toFixed(2);
  const spacistPercentage = ((spacistPoints / totalPoints) * 100).toFixed(2);
  const indexValue = spacistPercentage - earthistPercentage;

  resultDiv.innerHTML = `You are ${earthistPercentage}% Earthist and ${spacistPercentage}% Spacist.`;
  displayResultAxis(indexValue);

  // Disable the quiz form after submission
  quizForm.querySelectorAll('input').forEach(input => {
    input.disabled = true;
  });
  submitButton.disabled = true;
  submitButton.style.display = 'none';
  isQuizSubmitted = true;
}

function displayResultAxis(indexValue) {
  const axisWidth = 400;
  const indicatorPosition = (indexValue + 100) / 200 * axisWidth;

  const resultAxisDiv = document.createElement('div');
  resultAxisDiv.classList.add('result-container');

  const axisDiv = document.createElement('div');
  axisDiv.classList.add('axis');

  const indicatorDiv = document.createElement('div');
  indicatorDiv.classList.add('result-indicator');
  indicatorDiv.style.left = `${indicatorPosition - 10}px`;

  axisDiv.appendChild(indicatorDiv);
  resultAxisDiv.appendChild(axisDiv);

  resultDiv.parentNode.insertBefore(resultAxisDiv, resultDiv.nextSibling);
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  if (isQuizSubmitted) {
    alert('You have already submitted the quiz.');
    return;
  }

  calculateResults();
});

displayQuestions();
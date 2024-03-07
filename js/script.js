// make questions list

const questions = [
	{
		question: `What is the capital of France?`,
		answers: [
			{ text: "Paris", correct: true},
			{ text: "Lyon", correct: false},
			{ text: "Marseille", correct: false},
			{ text: "Saint Petersburg", correct: false},
		]
	},
	{
		question: `Who wrote "To Kill a Mockingbird"?`,
		answers: [
			{ text: "Andrei Angoeoi", correct: false},
			{ text: "Mark Twain", correct: false},
			{ text: "J.D. Salinger", correct: false},
			{ text: "Harper Lee", correct: true},
		]
	},
	{
		question: `What is the largest planet in our solar system?`,
		answers: [
			{ text: "Saturn", correct: false},
			{ text: "Jupiter", correct: true},
			{ text: "Bumba", correct: false},
			{ text: "Uranus", correct: false},
		]
	},
	{
		question: `What is the capital of South Korea?`,
		answers: [
			{ text: "Seoul", correct: true},
			{ text: "Busan", correct: false},
			{ text: "Incheon", correct: false},
			{ text: "Daegu", correct: false},
		]
	},
	{
		question: `What is the chemical symbol for iron`,
		answers: [
			{ text: "Au", correct: false},
			{ text: "F", correct: false},
			{ text: "Fe", correct: true},
			{ text: "Fm", correct: false},
		]
	},
	{
		question: `Who is the president of Brazil?`,
		answers: [
			{ text: "Jair Bolsonaro", correct: true},
			{ text: "Luiz Inácio Lula da Silva", correct: false},
			{ text: "Dilma Rousseff", correct: false},
			{ text: "Fernando Henrique Cardoso", correct: false},
		]
	},
	{
		question: `Who is the prime minister of the United Kingdom?`,
		answers: [
			{ text: "Theresa May", correct: false},
			{ text: "David Cameron", correct: false},
			{ text: "Gordon Brown", correct: false},
			{ text: "Boris Johnson", correct: true},
		]
	},
];

// get elements from index.html through DOM

const questionElement = document.getElementById("question"); 
const answerButton = document.getElementById("answer_buttons");
const nextBtn = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score = 0;

// create function startQuiz() - which will start from 0 score and 0 current index of question,
// then function will be add innerHtmlText into next button and function will be run another function


const startQuiz = () => {
	currentQuestionIndex = 0;
	score = 0;
	nextBtn.innerHTML = "Next";
	showQuestion();
}

const showQuestion = () => {
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add('btn');
		answerButton.appendChild(button);
		if(answer.correct){
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}

const resetState = () => {
	nextBtn.style.display = "none";
	while(answerButton.firstChild) {
		answerButton.removeChild(answerButton.firstChild);
	}
}

const selectAnswer = (e) => {
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect) {
		selectedBtn.classList.add("correct");
		score++;
	} else {
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButton.children).forEach(button => {
		if(button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextBtn.style.display = "block";
}

const showScore = () => {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextBtn.innerHTML = "Play Again";
	nextBtn.style.display = "block";
}

const handleNextButton = () => {
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	} else {
		showScore();
	}
}

nextBtn.addEventListener('click', ()=>{
	if(currentQuestionIndex < questions.length) {
		handleNextButton();
	} else {
		startQuiz();
	}
})

startQuiz();
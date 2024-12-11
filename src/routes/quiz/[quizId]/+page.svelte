<script>
  export let data;
  import Header from '$lib/components/navigation/Header.svelte';
  import Footer from "$lib/components/navigation/Footer.svelte"
  import greenCheckMark from "../../../lib/images/greenCheckMark.png"
  import redCheckmark from "../../../lib/images/redCheckMark.png";
  const quiz = data.quizResponse;
  let currentQuestionIndex = 0;
  let selectedAnswer = null;
  let userAnswers = {};
  let showResults = false;

  let quizResults = {
    userId: data.userResponse.id,
    quizId: quiz.id,
    totalQuestions: quiz.questions.length,
    correctAnswers: 0,
  };

  quiz.questions.forEach((question) => {
    question.shuffledAnswers = [
      question.answer,
      question.wrong_answer_1,
      question.wrong_answer_2,
      question.wrong_answer_3,
    ].sort(() => Math.random() - 0.5);
  });

  const selectAnswer = (questionId, answer) => {
    userAnswers[questionId] = answer;
    selectedAnswer = answer;
  };

  const isAnswerCorrect = (correctAnswer, selectedAnswer) => {
    return correctAnswer === selectedAnswer;
  };

  const processCurrentQuestion = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestion.id];

    if (isAnswerCorrect(currentQuestion.answer, userAnswer)) {
      quizResults.correctAnswers++;
    }
  };

  const next = () => {
    processCurrentQuestion();
    if (currentQuestionIndex < quiz.questions.length - 1) {
      currentQuestionIndex++;
    } else {
      showResults = true;
    }
    selectedAnswer = null;
  };

  const isLastQuestion = () => currentQuestionIndex === quiz.questions.length - 1;
</script>

<Header userData={data.userResponse} jwt={data.newAccessToken} />

<div class="quiz-container">
  {#if !showResults}
    <div class="quiz-box">
      <h2>Quiz: {quiz.quiz_name}</h2>
      <p> Question {currentQuestionIndex + 1}/{quiz.questions.length}: {quiz.questions[currentQuestionIndex].question}</p>
      <div class="answers">
        {#each quiz.questions[currentQuestionIndex].shuffledAnswers as answer}
          <button
            class="answer {selectedAnswer === answer ? 'selected' : ''}"
            on:click={() =>
              selectAnswer(quiz.questions[currentQuestionIndex].id, answer)
            }
          >
            {answer}
          </button>
        {/each}
      </div>
      <button class="button-next" on:click={next} disabled={!selectedAnswer}>
        {isLastQuestion() ? "Submit" : "Next"}
      </button>
    </div>
  {/if}

  {#if showResults}
    <div class="results-box">
      <h2>Quiz Results</h2>
      <ul>
        {#each quiz.questions as question}
          <li class="result-item">
            <strong>Question:</strong> {question.question}
            <br />
            <strong>Your answer:</strong> {userAnswers[question.id]}
            <br />
            <strong>Correct answer:</strong> {question.answer}
            <br />
            <strong>Explanation</strong> {question.explanation}
            <br />
            <img
              src={isAnswerCorrect(question.answer, userAnswers[question.id]) ? greenCheckMark : redCheckmark}
              alt={isAnswerCorrect(question.answer, userAnswers[question.id]) ? "Correct" : "Incorrect"}
              class="result-icon"
            />
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
<Footer />
<style>
  .quiz-container {
    padding: 16px;
    background-color: #0E172B; /* Background color from palette */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .quiz-box, .results-box {
    background-color: #1F283B; /* Div color from palette */
    border-radius: 20px; /* Larger rounding for the box */
    padding: 24px;
    margin: 16px 0;
    text-align: center;
    width: 90%; /* Make it responsive */
    max-width: 800px; /* Limit maximum width */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .answers {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .answer {
    background-color: #80808080;
    display: block; /* Make the buttons block-level to span the full width */
    width: 100%; /* Fill 100% of the container width */
    max-width: 600px; /* Optional: Limit the maximum width for better aesthetics */
    margin: 12px auto; /* Center the buttons horizontally */
    padding: 12px;
    border: 2px solid transparent;
    border-radius: 10px; /* Rounded corners */
    color: #E4F5F6; /* Text color */
    cursor: pointer;
    font-size: 1rem;
    text-align: center; /* Ensure text is centered */
    transition: background-color 0.3s, transform 0.2s;
  }

  .answer:hover {
    background-color: #23CBC2; /* Special color for hover */
    color: #0E172B; /* Contrast text color */
    transform: scale(1.02);
  }

  .answer.selected {
    background-color: #23CBC2; /* Highlight selected */
    color: #0E172B; /* Contrast text color */
    border-color: #E4F5F6; /* Add border for emphasis */
  }

  .button-next {
    padding: 12px 24px;
    background-color: #23CBC2; /* Special color */
    color: #0E172B; /* Contrast text color */
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s, transform 0.2s;
  }

  .button-next:hover {
    background-color: #1F283B; /* Hover with div color */
    color: #E4F5F6;
    transform: translateY(-3px);
  }

  button:disabled {
    background-color: #666; /* Disabled button style */
    color: #ccc;
    cursor: not-allowed;
  }

  .results-box ul {
    list-style: none;
    padding: 0;
  }

  .results-box li {
    margin: 16px 0;
    padding: 12px;
    background-color: #1F283B;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .results-box strong {
    color: #23CBC2; /* Highlight important text */
  }

  .result-item {
    align-items: center;
    justify-content: center; /* Centering horizontally */
    padding-bottom: 10px; /* Padding for spacing below the content */
  }

  .result-item img {
    width: 50px;
    height: 50px;
    display: block; /* Ensures the image is block-level */
    margin: 0 auto; /* Centers the image horizontally */
  }
</style>

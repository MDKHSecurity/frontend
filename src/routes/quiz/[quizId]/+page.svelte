<script>
    export let data;
    const quiz = data.quizResponse;
    let currentQuestionIndex = 0;
    let selectedAnswer = null;
    let userAnswers = {};
    let showResults = false;
  
    let quizResults = {
      userId: data.userData.id,
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
  
  <div class="quiz-container">
    {#if !showResults}
      <div class="quiz-box">
        <h2>Quiz: {quiz.quiz_name}</h2>
        <p> Question {currentQuestionIndex + 1}/{quiz.questions.length}: 
          {quiz.questions[currentQuestionIndex].question}
        </p>
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
        <p>
          You answered {quizResults.correctAnswers} out of {quizResults.totalQuestions} questions correctly.
        </p>
        <ul>
          {#each quiz.questions as question}
            <li>
              <strong>Question:</strong> {question.question}
              <br />
              <strong>Your answer:</strong> {userAnswers[question.id]}
              <br />
              <strong>Correct answer:</strong> {question.answer}
              <br />
              <strong>Result:</strong>
              {isAnswerCorrect(question.answer, userAnswers[question.id]) ? "Correct" : "Incorrect"}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
  
  <style>
    .quiz-container {
      padding: 16px;
      background-color: #f9f9f9;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  
    .quiz-box, .results-box {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      width: 50%;
      margin: 16px 0;
    }
  
    .answers {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
  
    .answer {
      padding: 8px;
      width: 80%;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .answer.selected {
      background-color: #d1e7dd;
      border-color: #0f5132;
    }
  
    .button-next {
      margin-top: 16px;
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .button-next:disabled {
      background-color: #d6d6d6;
      cursor: not-allowed;
    }
  </style>
  
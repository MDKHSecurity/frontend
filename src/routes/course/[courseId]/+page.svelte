<script>
  import PostRequest from "$lib/components/requests/PostRequest.svelte";
  import Header from "$lib/components/navigation/Header.svelte";
  import Footer from "$lib/components/navigation/Footer.svelte"
  import greenCheckMark from "../../../lib/images/greenCheckMark.png"
  import redCheckmark from "../../../lib/images/redCheckMark.png";

  export let data;
  const courseResponse = data.coursesResponse;
  let currentQuizIndex = 0;
  let currentQuestionIndex = 0;
  let selectedAnswer;
  let userAnswers = {};
  let showResults = false;
  let quizResults = {
    userId: data.userResponse.id,
    roomId: data.roomId,
    courseId: courseResponse.id,
    totalQuestions: 0,
    correctAnswers: 0,
  };

  const selectAnswer = (quizId, questionId, answer) => {
    userAnswers[quizId] = {
      ...userAnswers[quizId],
      [questionId]: answer,
    };
    selectedAnswer = answer;
  };

  const isAnswerCorrect = (correctAnswer, selectedAnswer) => {
    return correctAnswer === selectedAnswer;
  };

  const processCurrentQuestion = () => {
    const currentQuiz = courseResponse.quizzes[currentQuizIndex];
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];

    quizResults.totalQuestions++;

    const userAnswer = userAnswers[currentQuiz.id]?.[currentQuestion.id];
    if (isAnswerCorrect(currentQuestion.answer, userAnswer)) {
      quizResults.correctAnswers++;
    }
  };

  const next = () => {
    processCurrentQuestion();
    if (currentQuestionIndex < courseResponse.quizzes[currentQuizIndex].questions.length - 1) 
    {
      currentQuestionIndex++;
    } else if (currentQuizIndex < courseResponse.quizzes.length - 1) {
      currentQuizIndex++;
      currentQuestionIndex = 0;
    }
    selectedAnswer = "";
  };

  const submitQuiz = async () => {
    processCurrentQuestion();
    showResults = true;
  };

  courseResponse.quizzes.forEach((quiz) => {
    quiz.questions.forEach((question) => {
      question.shuffledAnswers = [
        question.answer,
        question.wrong_answer_1,
        question.wrong_answer_2,
        question.wrong_answer_3,
      ].sort(() => Math.random() - 0.5);
    });
  });

  const isLastQuestion = () => {
    const currentQuiz = courseResponse.quizzes[currentQuizIndex];
    if (
      currentQuizIndex === courseResponse.quizzes.length - 1 &&
      currentQuestionIndex === currentQuiz.questions.length - 1
    ) {
      return true;
    }
  };
</script>
<Header userData={data.userResponse} jwt = {data.newAccessToken}/>
<div class="course-body">
  <div class="video-box">
    <h2>Videos</h2>
    {#each courseResponse.videos as video}
        <div>
          <h3>Video: {video.video_name}</h3>
          <iframe
            width="560"
            height="315"
            src={video.link.replace("watch?v=", "embed/")}
            title={video.video_name}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      {/each}
  </div>

  {#if !showResults}
    <div class="quiz-box">
      <h2>Quiz: {courseResponse.quizzes[currentQuizIndex].quiz_name}</h2>

      <div>
        <p>Question {currentQuestionIndex + 1}: {courseResponse.quizzes[currentQuizIndex].questions[currentQuestionIndex].question}
        </p>
        {#each courseResponse.quizzes[currentQuizIndex].questions[currentQuestionIndex].shuffledAnswers as answer}
          <button
            class="answer {selectedAnswer === answer ? 'selected' : ''}"
            on:click={() =>
              selectAnswer(
                courseResponse.quizzes[currentQuizIndex].id,
                courseResponse.quizzes[currentQuizIndex].questions[currentQuestionIndex].id, answer
              )}
          >
            {answer}
          </button>
        {/each}
      </div>
      {#if !isLastQuestion()}
        <button class="button-next" on:click={next} disabled={!selectedAnswer}>Next</button>
      {:else}
        <PostRequest
          submit={submitQuiz}
          jwt={data.newAccessToken}
          requestData={quizResults}
          apiParam="statistics"
          disabled={!selectedAnswer}
        />
      {/if}
    </div>
  {/if}

  
  {#if showResults}
    <div class="results-box">
      <h2>Quiz Results</h2>
      <ul>
        {#each courseResponse.quizzes as quiz}
          <li>
            <h3>{quiz.quiz_name}</h3>
            <ul>
              {#each quiz.questions as question}
                <li class="result-item">
                  <strong>Question:</strong> {question.question}
                  <br />
                  <strong>Your answer:</strong> {userAnswers[quiz.id]?.[question.id]}
                  <br />
                  <strong>Correct answer:</strong> {question.answer}
                  <br />
                  <strong>Explanation</strong> {question.explanation}
                  <img
                    src={
                      isAnswerCorrect(
                        question.answer,
                        userAnswers[quiz.id]?.[question.id]
                      )
                        ? greenCheckMark
                        : redCheckmark
                    }
                    alt={
                      isAnswerCorrect(
                        question.answer,
                        userAnswers[quiz.id]?.[question.id]
                      )
                        ? "Correct"
                        : "Incorrect"
                    }
                    class="result-icon"
                  />
                </li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    </div>
  {/if}  
</div>

<Footer />
<style>
  .result-item {
  align-items: center;
  justify-content: center; /* Centering horizontally */
  padding-bottom: 10px; /* Padding for spacing below the content */
}

.result-icon {
  width: 50px;
  height: 50px;
  display: block; /* Ensures the image is block-level */
  margin: 0 auto; /* Centers the image horizontally */
}
  .course-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 16px;
  background-color: #0E172B; /* Background color from palette */
  color: #E4F5F6; /* Text color from palette */
}

.video-box,
.quiz-box,
.results-box {
  background-color: #1F283B; /* Div color from palette */
  border-radius: 20px; /* Larger rounding for the box */
  padding: 24px;
  margin: 16px 0;
  text-align: center;
  width: 90%; /* Make it responsive */
  max-width: 800px; /* Limit maximum width */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.video-item {
  margin-bottom: 24px;
}

.video-item iframe {
  width: 100%; /* Responsive iframe */
  height: 315px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

.random-quiz-container {
  margin-top: 3rem;
  text-align: center;
}
</style>

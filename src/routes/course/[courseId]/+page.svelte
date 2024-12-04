<script>
  import PostRequest from "$lib/components/requests/PostRequest.svelte";
  import Header from "$lib/components/navigation/Header.svelte";
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
    courseId: data.courseId,
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
<Header userData={data.userResponse} jwt = {data.jwt}/>
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
        <p>
          Question {currentQuestionIndex + 1}: {courseResponse.quizzes[
            currentQuizIndex
          ].questions[currentQuestionIndex].question}
        </p>
        {#each courseResponse.quizzes[currentQuizIndex].questions[currentQuestionIndex].shuffledAnswers as answer}
          <button
            class="answer {selectedAnswer === answer ? 'selected' : ''}"
            on:click={() =>
              selectAnswer(
                courseResponse.quizzes[currentQuizIndex].id,
                courseResponse.quizzes[currentQuizIndex].questions[
                  currentQuestionIndex
                ].id,
                answer
              )}
          >
            {answer}
          </button>
        {/each}
      </div>
      {#if !isLastQuestion()}
        <button class="button-next" on:click={next} disabled={!selectedAnswer}
          >Next</button
        >
      {:else}
        <PostRequest
          submit={submitQuiz}
          jwt={data.jwt}
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
                <li>
                  <strong>Question:</strong>
                  {question.question}
                  <br />
                  <strong>Your answer:</strong>
                  {userAnswers[quiz.id]?.[question.id]}
                  <br />
                  <strong>Correct answer:</strong>
                  {question.answer}
                  <br />
                  <strong>Result:</strong>
                  {isAnswerCorrect(
                    quiz.id,
                    question.id,
                    userAnswers[quiz.id]?.[question.id]
                  )
                    ? "Correct"
                    : "Incorrect"}
                </li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .course-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 16px;
    background-color: #f9f9f9;
  }
  .video-box,
  .quiz-box,
  .results-box {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    text-align: center;
    width: 50%;
  }

  .answer {
    padding: 8px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
  }

  .answer.selected {
    background-color: #d1e7dd;
    border-color: #0f5132;
  }

  .button-next {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }

  button.selected {
    background-color: #6c757d;
  }
</style>

<script>
  import Modal from "../../../lib/components/modal/Modal.svelte";
  import DeleteRequest from "../../../lib/components/requests/DeleteRequest.svelte";
  import CreateRequest from "../../../lib/components/requests/CreateRequest.svelte";
  import Header from "../../../lib/components/navigation/Header.svelte";
  import Footer from "$lib/components/navigation/Footer.svelte"
  import plus_minus from "../../../lib/images/plus_minus.png"
  export let data;

  let showModal = false;
  let modalContent = null;
  let modalTitle = "";
  let requestData = {};
  let apiParam = "";

  let availableVideos = data.videosResponse || [];
  let availableQuestions = data.questionsResponse || [];
  let availableQuizzes = data.quizzesResponse || [];
  let availableCourses = data.coursesResponse || [];

  const openModal = (contentType, title, endpoint) => {
    modalContent = contentType;
    modalTitle = title;
    apiParam = endpoint;
    requestData = {};
    if (contentType === "quiz") {
      requestData.questions = [];
    } else if (contentType === "course") {
      requestData.videos = [];
      requestData.quizzes = [];
    }
    showModal = true;
  };

  const addNewItemToUI = (newItem) => {
    if (apiParam === "videos") {
      availableVideos = [...availableVideos, newItem];
    } else if (apiParam === "questions") {
      availableQuestions = [...availableQuestions, newItem];
    } else if (apiParam === "quizzes") {
      if (newItem.questions && Array.isArray(newItem.questions)) {
        newItem.questions = newItem.questions.map(id =>
          availableQuestions.find(question => question.id === id)
        );
      }
      availableQuizzes = [...availableQuizzes, newItem];
    } else if (apiParam === "courses") {
      if (newItem.videos && Array.isArray(newItem.videos)) {
        newItem.videos = newItem.videos.map(id =>
          availableVideos.find(video => video.id === id)
        );
      }
      if (newItem.quizzes && Array.isArray(newItem.quizzes)) {
        newItem.quizzes = newItem.quizzes.map(id =>
          availableQuizzes.find(quiz => quiz.id === id)
        );
      }
      availableCourses = [...availableCourses, newItem];
    }
  };

  const deleteItems = (id, type) => {
    if (type === "videos") {
      availableVideos = availableVideos.filter((video) => video.id !== id);
    } else if (type === "questions") {
      availableQuestions = availableQuestions.filter((question) => question.id !== id);
    } else if (type === "quizzes") {
      availableQuizzes = availableQuizzes.filter((quiz) => quiz.id !== id);
    } else if (type === "courses") {
      availableCourses = availableCourses.filter((course) => course.id !== id);
    }
  };
</script>

<Header userData={data.userResponse} jwt={data.newAccessToken} />

<main class="dashboard">
  <div class="welcome-container">
    <div class="text-container">
      <h1>Content</h1>
      <h2>Manage courses, quizzes, videos and questions</h2>
    </div>
    <img src={plus_minus} alt="" />
  </div>

  <div class="sections-container">
    <!-- Video Management -->
    <section class="dashboard-section">
      <h2>Videos</h2>
      <ul>
        {#each availableVideos as video (video.id)}
          <li class="room">
            {video.file_name} - {video.length} mins
            <DeleteRequest 
              id={video.id} 
              apiParam="videos" 
              jwt={data.newAccessToken}
              deleteItems={deleteItems} 
            />
          </li>
        {/each}
      </ul>
      <button class="add-button" on:click={() => openModal("video", "Add Video", "videos")}>Add Video</button>
    </section>

    <!-- Quizzes Section -->
    <section class="dashboard-section">
      <h2>Quizzes</h2>
      <ul>
        {#each availableQuizzes as quiz (quiz.id)}
          <li class="room">
            <strong>{quiz.quiz_name}</strong> - {quiz.number_of_questions} questions
            <ul>
              <li>
                <strong>Questions:</strong>
                <ul>
                  {#each quiz.questions as q}
                    <li>{q.question}</li>
                  {/each}
                </ul>
              </li>
            </ul>
            <DeleteRequest 
              id={quiz.id} 
              apiParam="quizzes" 
              jwt={data.newAccessToken}
              deleteItems={deleteItems} 
            />
          </li>
        {/each}
      </ul>
      <button class="add-button" on:click={() => openModal("quiz", "Add Quiz", "quizzes")}>Add Quiz</button>
    </section>

    <!-- Questions Management -->
    <section class="dashboard-section">
      <h2>Questions</h2>
      <ul>
        {#each availableQuestions as question (question.id)}
          <li class="room">
            {question.question}
            <DeleteRequest 
              id={question.id} 
              apiParam="questions" 
              jwt={data.newAccessToken}
              deleteItems={deleteItems} 
            />
          </li>
        {/each}
      </ul>
      <button class="add-button" on:click={() => openModal("question", "Add Question", "questions")}>Add Question</button>
    </section>

    <!-- Courses Section -->
    <section class="dashboard-section">
      <h2>Courses</h2>
      <ul>
        {#each availableCourses as course (course.id)}
          <li class="room">
            <strong>{course.course_name}</strong>
            <ul>
              <li>
                <strong>Videos:</strong>
                <ul>
                  {#each course.videos as video}
                    <li>{video.video_name}</li>
                  {/each}
                </ul>
              </li>
              <li>
                <strong>Quizzes:</strong>
                <ul>
                  {#each course.quizzes as quiz}
                    <li>{quiz.quiz_name}</li>
                  {/each}
                </ul>
              </li>
            </ul>
            <DeleteRequest 
              id={course.id} 
              apiParam="courses" 
              jwt={data.newAccessToken}
              deleteItems={deleteItems} 
            />
          </li>
        {/each}
      </ul>
      <button class="add-button" on:click={() => openModal("course", "Add Course", "courses")}>Add Course</button>
    </section>
  </div>

  <!-- Modal -->
  <Modal bind:show={showModal} title={modalTitle}>
    <CreateRequest 
      jwt={data.newAccessToken} 
      {requestData} 
      {apiParam} 
      onSubmit={(newItem) => { 
        addNewItemToUI(newItem); 
        showModal = false; 
      }}
    >
      <!-- Modal Content -->
      {#if modalContent === "video"}
          File Name: <input bind:value={requestData.file_name} required />
          File Type: <input bind:value={requestData.video_name} required />
          Length (mins): <input type="number" bind:value={requestData.length} required />
      {/if}
      
      {#if modalContent === "quiz"}
        <label>
          Quiz Name: <input bind:value={requestData.quiz_name} required />
        </label>
        <label>
          Number of Questions: <input type="number" bind:value={requestData.number_of_questions} required />
        </label>
        <label>
          Choose Questions:
          <select bind:value={requestData.questions} multiple size="10" style="width: 100%;">
            {#each availableQuestions as question (question.id)}
              <option value={question.id}>{question.question}</option>
            {/each}
          </select>
        </label>
      {/if}
      
      {#if modalContent === "question"}
        <label>
          Question: <input bind:value={requestData.question} required />
        </label>
        <label>
          Correct Answer: <input bind:value={requestData.answer} required />
        </label>
        <label>
          Wrong Answer 1: <input bind:value={requestData.wrong_answer_1} required />
        </label>
        <label>
          Wrong Answer 2: <input bind:value={requestData.wrong_answer_2} required />
        </label>
        <label>
          Wrong Answer 3: <input bind:value={requestData.wrong_answer_3} required />
        </label>
      {/if}
      
      {#if modalContent === "course"}
        <label>
          Course Name: <input bind:value={requestData.course_name} required />
        </label>
        <label>
          Description: <textarea bind:value={requestData.description} required></textarea>
        </label>
        <label>
          Choose Videos:
          <select bind:value={requestData.videos} multiple size="5" style="width: 100%;">
            {#each availableVideos as video (video.id)}
              <option value={video.id}>{video.file_name}</option>
            {/each}
          </select>
        </label>
        <label>
          Choose Quizzes:
          <select bind:value={requestData.quizzes} multiple size="5" style="width: 100%;">
            {#each availableQuizzes as quiz (quiz.id)}
              <option value={quiz.id}>{quiz.quiz_name}</option>
            {/each}
          </select>
        </label>
      {/if}
    </CreateRequest>
  </Modal>
</main>
<Footer />
<style>
  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  .welcome-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    max-width: 40%; /* Adjust text width as needed */
  }

  h1 {
    color: #e4f5f6;
    margin: 0;
  }

  p {
    color: #e4f5f6;
    font-size: 1rem;
    margin: 0.5rem 0 0 0; /* Space beneath h1 */
    line-height: 1.5;
  }

  img {
    height: auto;
    width: 250px;
    flex-shrink: 0; /* Prevent image from shrinking */
    margin: 30px;
  }

  .sections-container {
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
  }

  .dashboard-section {
    margin: 20px;
    flex: 1 1 calc(45% - 20px);
    border-radius: 8px;
    padding: 20px;
    background-color: #1f283b;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .dashboard-section h2 {
    margin-top: 0;
    color: #e4f5f6;
  }

  .room {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #444;
    margin-bottom: 8px;
  }

  .add-button {
    background-color: #23cbc2;
    color: #e4f5f6;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  }

  .add-button:hover {
    background-color: #1f9e94;
  }

  input{
    padding: 6px;
    margin-bottom: 16px;
    border: 2px solid #23cbc2;
    border-radius: 8px;
    color: #E4F5F6;
    background-color: #80808080; /* Same background as form */
  }
  select{
    color: #E4F5F6;
    background-color: #80808080;
  }
  textarea{
    color: #E4F5F6;
    background-color: #80808080;
  }
</style>

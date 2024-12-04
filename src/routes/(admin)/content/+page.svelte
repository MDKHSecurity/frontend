<script>
  import Modal from "../../../lib/components/modal/Modal.svelte";
  import DeleteRequest from "../../../lib/components/requests/DeleteRequest.svelte";
  import CreateRequest from "../../../lib/components/requests/CreateRequest.svelte";
  import Header from "../../../lib/components/navigation/Header.svelte"
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
<Header userData={data.userResponse} jwt = {data.jwt}/>

<main>
  <h1>Admin Dashboard</h1>
  <!-- Container for sections -->
  <div class="sections-container">
    <!-- Video Management -->
    <section class="dashboard-section">
      <h2>Videos</h2>
      <ul>
        {#each availableVideos as video (video.id)}
          <li>
            {video.file_name} - {video.length} mins
            <DeleteRequest 
              id={video.id} 
              apiParam="videos" 
              jwt={data.jwt}
              deleteItems={deleteItems} 
            />
          </li>
        {/each}
      </ul>
      <button on:click={() => openModal("video", "Add Video", "videos")}>
        Add Video
      </button>
    </section>

    <!-- Quizzes Section -->
    <section class="dashboard-section">
      <h2>Quizzes</h2>
      <ul>
        {#each availableQuizzes as quiz (quiz.id)}
          <li>
            <strong>{quiz.quiz_name}</strong> - {quiz.number_of_questions} questions
            <ul>
              <li>
                <strong>Questions:</strong>
                <ul>
                  {#each quiz.questions as qqqqq}
                    <li>{qqqqq.question}</li>
                  {/each}
                </ul>
              </li>
            </ul>
            <DeleteRequest 
              id={quiz.id} 
              apiParam="quizzes" 
              jwt={data.jwt}
              deleteItems={deleteItems} 
            />
          </li>
        {/each}
      </ul>
      <button on:click={() => openModal("quiz", "Add Quiz", "quizzes")}>
        Add Quiz
      </button>
    </section>

    <!-- Questions Management -->
    <section class="dashboard-section">
      <h2>Questions</h2>
      <ul>
        {#each availableQuestions as question (question.id)}
          <li>
            {question.question}
            <DeleteRequest 
              id={question.id} 
              apiParam="questions" 
              jwt={data.jwt}
              deleteItems={deleteItems} 
            />
          </li>
        {/each}
      </ul>
      <button on:click={() => openModal("question", "Add Question", "questions")}>
        Add Question
      </button>
    </section>

    <!-- Courses Section -->
    <section class="dashboard-section">
      <h2>Courses</h2>
      <ul>
        {#each availableCourses as course (course.id)}
          <li>
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
              jwt={data.jwt}
              deleteItems={deleteItems} 
            />
          </li>
        {/each}
      </ul>
      <button on:click={() => openModal("course", "Add Course", "courses")}>
        Add Course
      </button>
    </section>
  </div>

  <!-- Modal -->
  <Modal bind:show={showModal} title={modalTitle}>
    <CreateRequest 
      jwt={data.jwt} 
      {requestData} 
      {apiParam} 
      onSubmit={(newItem) => { 
        addNewItemToUI(newItem); 
        showModal = false; 
      }}
    >
      <!-- Modal Content -->
      {#if modalContent === "video"}
        <label>
          File Name: <input bind:value={requestData.file_name} required />
        </label>
        <label>
          File Type: <input bind:value={requestData.video_name} required />
        </label>
        <label>
          Length (mins): <input type="number" bind:value={requestData.length} required />
        </label>
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

<style>
  .sections-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .dashboard-section {
    flex: 1 1 calc(50% - 20px);
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  section h2 {
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
  }

  li {
    margin: 0.5rem 0;
  }

  button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>

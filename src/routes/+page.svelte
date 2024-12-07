<script>
  export let data;
  import Header from "../lib/components/navigation/Header.svelte"
  const userResponse = data?.userResponse;
  const quizData = data?.quizResponse;

  const allRoomCourses = userResponse?.rooms?.map(room => ({
    roomId: room.id,
    roomName: room.name,
    courses: room.courses
  })) || [];


  function getRandomQuizURL() {
    if (!quizData.length) {
      return;
    }
    const randomQuiz = quizData[Math.floor(Math.random() * quizData.length)];
    return `/quiz/${randomQuiz.id}`;
  }

</script>
<Header userData={data.userResponse} jwt = {data.jwt}/>

<h1>Welcome {userResponse.username}</h1>

<div>
  <h2>All Rooms and Their Courses:</h2>
  {#each allRoomCourses as { roomId, roomName, courses }}
    <div>
      <h3>Room: {roomName}</h3>
      <ul class="course-list">
        {#each courses as course}
          <li>
            <a class="course-box" href={`/course/${course.id}?roomId=${roomId}`}>
              {course.name}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>

<div class="random-quiz-container">
  <a class="random-quiz-button" href={getRandomQuizURL()} on:click={() => (randomQuizURL = getRandomQuizURL())}>
    Take Random Quiz
  </a>
</div>

<style>
  h2 {
    margin-top: 1rem;
    color: #333;
  }

  .course-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .course-box {
    display: block;
    width: 200px;
    padding: 1rem;
    background-color: #f0f0f0;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .course-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    background-color: #e0e0e0;
  }

  .course-box:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .random-quiz-container {
    margin-top: 2rem;
    text-align: center;
  }

  .random-quiz-button {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s, transform 0.2s;
  }

  .random-quiz-button:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
  }

  .random-quiz-button:active {
    transform: translateY(0);
  }
</style>

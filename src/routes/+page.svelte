<script>
  export let data;
  import Header from "../lib/components/navigation/Header.svelte"
  import Footer from "../lib/components/navigation/Footer.svelte"
  const userResponse = data?.userResponse;
  const quizData = data?.quizResponse;

  const allRoomCourses = userResponse?.rooms?.map(room => ({
    roomId: room.id,
    roomName: room.room_name,
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

<Header userData={data.userResponse} jwt={data.newAccessToken} />

<div class="header-container">
  <div class="text-container">
    <h1>Welcome {userResponse.username}</h1>
    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada nisi tellus, non imperdiet nisi tempor at. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</h2>
  </div>
  <img src="https://img.pikbest.com/png-images/school-building-cartoon-school-elements_5882542.png!w700wp" alt="">
</div>

<div class="random-quiz-container">
  <a class="random-quiz-button" href={getRandomQuizURL()} on:click={() => (getRandomQuizURL())}>
    Take Random Quiz
  </a>
</div>
<div class="courses-container">
  {#each allRoomCourses as { roomId, roomName, courses }}
    <div class="room-container">
      <h3>{roomName}</h3>
      <ul class="course-list">
        {#each courses as course}
          <li>
            <a class="course-box" href={`/course/${course.id}?roomId=${roomId}`}>
              {course.course_name}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>
<Footer/>
<style>
  /* Align h1 and image side-by-side */
  .header-container {
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
  color: #E4F5F6;
  margin: 0;
}

h2 {
  color: #E4F5F6;
  font-size: 1rem;
  margin: 0.5rem 0 0 0; /* Space beneath h1 */
  line-height: 1.5;
}

h3{
  color: #E4F5F6;
  font-size: 2rem;
  margin: 2rem; /* Space beneath h1 */
  line-height: 1.5;
}
img {
  height: auto;
  width: 250px;
  flex-shrink: 0; /* Prevent image from shrinking */
}

  /* Centralize and style course boxes */
  .courses-container {
    text-align: center;
  }

  .room-container {
    margin: 2rem 0;
  }

  .course-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }

  .course-box {
    display: block;
    width: 500px;
    padding: 1.5rem;
    background-color: #80808080; /* Div color from palette */
    border-radius: 20px; /* Larger rounding */
    text-align: center;
    text-decoration: none;
    color: #E4F5F6; /* Text color from palette */
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .course-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    background-color: #23CBC2; /* Highlight color */
    color: #0E172B; /* Contrast text color */
  }

  .random-quiz-container {
    margin-top: 3rem;
    text-align: center;
  }

  .random-quiz-button {
    display: inline-block;
    padding: 1rem 2.5rem;
    background-color: #23CBC2; /* Special color */
    color: #0E172B; /* Contrast text color */
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 15px;
    transition: background-color 0.3s, transform 0.2s;
  }

  .random-quiz-button:hover {
    background-color: #1F283B; /* Div color for hover */
    color: #E4F5F6;
    transform: translateY(-3px);
  }
</style>

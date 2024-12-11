<script>
  import Chart from "chart.js/auto";
  import Header from "$lib/components/navigation/Header.svelte";
  import Footer from "$lib/components/navigation/Footer.svelte"

  export let data;

  const roomsResponse = data.roomsResponse.rooms;
  let selectedRoom;
  let selectedRoomData;

  let charts = {};
  let canvases = [];

  $: if (selectedRoom) {
    selectedRoomData = roomsResponse.find(
      (room) => room.room_id === selectedRoom
    );
  }

  $: if (selectedRoomData) {
    selectedRoomData.courses_statistics.forEach((course, index) => {
      const canvas = canvases[index];
      if (canvas) {
        createChart(index, course, canvas);
      }
    });
  }

  function createChart(courseId, course, canvas) {
    const correct = course.correct_answers;
    const incorrect = course.total_questions - correct;

    if (charts[courseId]) {
      charts[courseId].destroy();
    }

    charts[courseId] = new Chart(canvas, {
      type: "pie",
      data: {
        labels: ["Correct Answers", "Incorrect Answers"],
        datasets: [
          {
            data: [correct, incorrect],
            backgroundColor: ["#4CAF50", "#F44336"],
            hoverBackgroundColor: ["#66BB6A", "#E57373"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }
</script>

<Header userData={data.userResponse} jwt={data.newAccessToken} />
<div class="header-container">
  <div class="text-container">
    <h1>welcome</h1>
    <h2>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      malesuada nisi tellus, non imperdiet nisi tempor at. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore.
    </h2>
  </div>
  <img
    src="https://img.pikbest.com/png-images/school-building-cartoon-school-elements_5882542.png!w700wp"
    alt=""
  />
</div>
<div class="room-selection-container">
  <select
    id="rooms-dropdown"
    bind:value={selectedRoom}
    aria-label="Room Selector"
    class="styled-dropdown"
  >
    <option value="" disabled selected>Choose a room</option>
    {#each roomsResponse as room}
      <option value={room.room_id}>{room.room_name}</option>
    {/each}
  </select>

  {#if selectedRoomData}
    <div class="course-list">
      <ul>
        {#each selectedRoomData.courses_statistics as course, index}
          {#if course.course_name}
            <li class="course-item">
              <strong>{course.course_name}</strong>
              <div class="chart-container">
                <canvas bind:this={canvases[index]}></canvas>
              </div>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  {/if}
</div>

<Footer />
<style>
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
    color: #e4f5f6;
    margin: 0;
  }

  h2 {
    color: #e4f5f6;
    font-size: 1rem;
    margin: 0.5rem 0 0 0; /* Space beneath h1 */
    line-height: 1.5;
  }

  img {
    height: auto;
    width: 250px;
    flex-shrink: 0; /* Prevent image from shrinking */
  }

  .room-selection-container {
    padding: 16px;
    background-color: #1f283b;
    width: 100%;
    max-width: 800px; /* Adjusted for better centering */
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 0 auto; /* Centers horizontally */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .styled-dropdown {
    width: 100%;
    padding: 12px;
    background-color: #1f283b;
    border: 2px solid #23cbc2;
    color: #e4f5f6;
    font-size: 16px;
    border-radius: 8px; /* More rounded borders */
    margin-bottom: 16px;
    text-align: center;
  }

  .course-list {
    list-style: none;
    padding: 0;
    margin: 16px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* Center course items horizontally */
  }

  .course-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
  }

  .chart-container {
    width: 300px;
    height: 300px;
    margin-top: 20px;
  }
</style>

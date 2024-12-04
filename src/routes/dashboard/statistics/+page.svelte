<script>
    import Chart from 'chart.js/auto';
    import Header from '$lib/components/navigation/Header.svelte';
    export let data;
  
    const roomsResponse = data.roomsResponse.rooms;
    let selectedRoom;
    let selectedRoomData;
  
    let charts = {};
    let canvases = [];
  
    $: if (selectedRoom) {
      selectedRoomData = roomsResponse.find(room => room.room_id === selectedRoom);
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
        type: 'pie',
        data: {
          labels: ['Correct Answers', 'Incorrect Answers'],
          datasets: [
            {
              data: [correct, incorrect],
              backgroundColor: ['#4CAF50', '#F44336'],
              hoverBackgroundColor: ['#66BB6A', '#E57373']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    }
  </script>
    <Header userData={data.userResponse} jwt = {data.jwt}/>
  
  <div>
    <label for="rooms-dropdown">Select a Room:</label>
    <select
      id="rooms-dropdown"
      bind:value={selectedRoom}
      aria-label="Room Selector"
    >
      <option value="" disabled selected>Choose a room</option>
      {#each roomsResponse as room}
        <option value={room.room_id}>{room.room_name}</option>
      {/each}
    </select>
  
    {#if selectedRoomData}
      <h2>{selectedRoomData.room_name}</h2>
      <div>
        <h3>Courses in this Room:</h3>
        <ul>
          {#each selectedRoomData.courses_statistics as course, index}
            {#if course.course_name}
              <li>
                <strong>{course.course_name}</strong><br>
                Correct Answers: {course.correct_answers} <br>
                Total Questions: {course.total_questions}
                <div style="width: 300px; height: 300px; margin-top: 20px;">
                  <canvas bind:this={canvases[index]}></canvas>
                </div>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
    {/if}
  </div>
  
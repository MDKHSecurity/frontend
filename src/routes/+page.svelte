<script>
  export let data;
  
  const userData = data.userResponse;

  // Aggregate all rooms and their courses into a single structure
  const allRoomCourses = userData.rooms.map(room => ({
    roomId: room.id,
    roomName: room.name,
    courses: room.courses
  }));
</script>

<h1>Welcome {userData.username}</h1>

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
    transition:
      transform 0.2s,
      box-shadow 0.2s;
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
</style>

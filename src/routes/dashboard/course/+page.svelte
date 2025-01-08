<script>
  import Header from "$lib/components/navigation/Header.svelte";
  import PostAndDelete from "../../../lib/components/requests/PostAndDelete.svelte";
  import Footer from "$lib/components/navigation/Footer.svelte"

  export let data;
  const roomsResponse = data.roomsResponse;
  const coursesResponse = data.coursesResponse;
  let selectedRoom;

  let addCourse = [];
  let removeCourse = [];

  let checkboxStates = {};

  function isCourseAssignedToRoom(courseId) {
    return selectedRoom.courses.some((course) => course.id === courseId);
  }

  const updateAssigned = (response) => {
    response.assigned.forEach(({ roomId, courseId }) => {
      const roomIndex = roomsResponse.findIndex((room) => room.id === roomId);
      const courseExists = roomsResponse[roomIndex].courses.some(
        (course) => course.id === courseId
      );
      if (!courseExists) {
        roomsResponse[roomIndex].courses.push({
          id: courseId,
        });
      }
    });
  };

  const updateDeleted = (response) => {
    response.deleted.forEach(({ roomId, courseId }) => {
      const roomIndex = roomsResponse.findIndex((room) => room.id === roomId);
      roomsResponse[roomIndex].courses = roomsResponse[
        roomIndex
      ].courses.filter((course) => course.id !== courseId);
    });
  };

  $: if (selectedRoom) {
    addCourse = [];
    removeCourse = [];
    checkboxStates = {};
    coursesResponse.forEach((course) => {
      checkboxStates[course.id] = isCourseAssignedToRoom(course.id);
    });
  }

  function handleCheckboxChange(courseId, roomId, isChecked) {
    const wasInitiallyChecked = selectedRoom.courses.some(
      (course) => course.id === courseId
    );

    if (isChecked) {
      if (!wasInitiallyChecked) {
        if (
          !addCourse.some(
            (entry) => entry.courseId === courseId && entry.roomId === roomId
          )
        ) {
          addCourse.push({ courseId, roomId });
        }
      }
      removeCourse = removeCourse.filter(
        (entry) => !(entry.courseId === courseId && entry.roomId === roomId)
      );
    } else {
      if (wasInitiallyChecked) {
        if (
          !removeCourse.some(
            (entry) => entry.courseId === courseId && entry.roomId === roomId
          )
        ) {
          removeCourse.push({ courseId, roomId });
        }
      }
      addCourse = addCourse.filter(
        (entry) => !(entry.courseId === courseId && entry.roomId === roomId)
      );
    }
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
      <option value={room}>{room.room_name}</option>
    {/each}
  </select>

  {#if selectedRoom}
    <ul class="course-list">
      {#each coursesResponse as course}
        <li class="course-item">
          <label class="toggle-switch">
            <input
              type="checkbox"
              bind:checked={checkboxStates[course.id]}
              on:change={(event) =>
                handleCheckboxChange(
                  course.id,
                  selectedRoom.id,
                  event.target.checked
                )}
            />
            <span class="slider"></span>
          </label>
          {course.course_name}
        </li>
      {/each}
    </ul>
    <PostAndDelete
      endpoint={"rooms/courses"}
      postBody={{ assigned: addCourse }}
      deleteBody={{ removed: removeCourse }}
      jwt={data.newAccessToken}
      {updateAssigned}
      {updateDeleted}
    />
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
    max-width: 600px; /* Limits width for better centering */
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto; /* Centers horizontally */
  }

  .styled-dropdown {
    width: 100%;
    padding: 12px;
    background-color: #1f283b;
    border: 2px solid #23cbc2;
    color: #e4f5f6;
    font-size: 16px;
    border-radius: 8px; /* More rounded borders */
    text-align: center;
  }

  .course-list {
    list-style: none;
    padding: 0;
    margin: 16px 0;
    width: 100%;
  }

  .course-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    margin-left: 40%;
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 58px; /* 20% larger than original */
    height: 28px; /* 20% larger than original */
    margin-right: 8px;
  }

  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 14px; /* More rounded edges */
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 24px; /* 20% larger */
    width: 24px; /* 20% larger */
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  .toggle-switch input:checked + .slider {
    background-color: #23cbc2;
  }

  .toggle-switch input:checked + .slider:before {
    transform: translateX(30px); /* Adjusted to make sure it's centered */
  }
</style>

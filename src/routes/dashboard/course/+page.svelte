<script>
  import Header from "$lib/components/navigation/Header.svelte";
  export let data;
  const roomsResponse = data.roomsResponse;
  const coursesResponse = data.coursesResponse;
  import PostAndDelete from "../../../lib/components/requests/PostAndDelete.svelte";
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
      roomsResponse[roomIndex].courses = roomsResponse[roomIndex].courses.filter((course) => course.id !== courseId);
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
<Header userData={data.userResponse} jwt = {data.newAccessToken}/>
<div>
  <label for="rooms-dropdown">Select a Room:</label>
  <select
    id="rooms-dropdown"
    bind:value={selectedRoom}
    aria-label="Room Selector"
  >
    <option value="" disabled selected>Choose a room</option>
    {#each roomsResponse as room}
      <option value={room}>{room.room_name}</option>
    {/each}
  </select>

  {#if selectedRoom}
    <h2>Courses for the Selected Room:</h2>
    <ul>
      {#each coursesResponse as course}
        <li>
          <label>
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
            {course.course_name}
          </label>
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

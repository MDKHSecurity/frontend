<script>
  export let data;
  const roomsResponse = data.roomsResponse;
  const usersResponse = data.usersResponse;
  let selectedRoom;
  import PostAndDelete from "../../../lib/components/requests/PostAndDelete.svelte";

  let addRoom = [];
  let removeRoom = [];

  let checkboxStates = {};

  function isUserAssignedToRoom(user, roomId) {
    return user.rooms.some((room) => room.id === roomId);
  }
  
  const updateAssigned = (response) => {
    response.assigned.forEach(({ userId, roomId }) => {
        const userIndex = usersResponse.findIndex(user => user.id === userId);
        const roomExists = usersResponse[userIndex].rooms.some(room => room.id === roomId);
        if (!roomExists) {
                usersResponse[userIndex].rooms.push({
                    id: roomId
                });
            }
    });
  };

  const updateDeleted = (response) => {
    response.deleted.forEach(({ userId, roomId }) => {
        const userIndex = usersResponse.findIndex(user => user.id === userId);
            usersResponse[userIndex].rooms = usersResponse[userIndex].rooms.filter(room => room.id !== roomId);
    });
  };

  $: if (selectedRoom) {
    addRoom = [];
    removeRoom = [];

    checkboxStates = {};
    usersResponse.forEach((user) => {checkboxStates[user.id] = isUserAssignedToRoom(user, selectedRoom);});
  }

  function handleCheckboxChange(userId, roomId, isChecked) {
    const wasInitiallyChecked = usersResponse.find((user) => user.id === userId)?.rooms.some((room) => room.id === roomId);
    if (isChecked) {
      if (!wasInitiallyChecked) {
        if (!addRoom.some((ur) => ur.userId === userId && ur.roomId === roomId)) 
        {
          addRoom.push({ userId, roomId });
        }
      }
      
      removeRoom = removeRoom.filter((ur) => !(ur.userId === userId && ur.roomId === roomId));
    } else {
      if (wasInitiallyChecked) {
        if (!removeRoom.some((ur) => ur.userId === userId && ur.roomId === roomId)) {
          removeRoom.push({ userId, roomId });
        }
      }
      addRoom = addRoom.filter((ur) => !(ur.userId === userId && ur.roomId === roomId));
    }
  }
</script>

<div>
  <label for="rooms-dropdown">Select a Room:</label>
  <select
    id="rooms-dropdown"
    bind:value={selectedRoom}
    aria-label="Room Selector"
  >
    <option value="" disabled selected>Choose a room</option>
    {#each roomsResponse as room}
      <option value={room.id}>{room.room_name}</option>
    {/each}
  </select>

  {#if selectedRoom}
    <h2>Users in the Institution:</h2>
    <ul>
      {#each usersResponse as user}
        <li>
          <label>
            <input
              type="checkbox"
              bind:checked={checkboxStates[user.id]}
              on:change={(event) =>
                handleCheckboxChange(
                  user.id,
                  selectedRoom,
                  event.target.checked
                )}
            />
            {user.username}
          </label>
        </li>
      {/each}
    </ul>
    <PostAndDelete
      endpoint={"users/rooms"}
      postBody={{ assigned: addRoom }}
      deleteBody={{removed: removeRoom}}
      jwt={data.jwt}
      {updateAssigned}
      {updateDeleted}
    />
  {/if}
</div>

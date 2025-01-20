<script>
  import Header from "$lib/components/navigation/Header.svelte";
  import PostAndDelete from "../../../lib/components/requests/PostAndDelete.svelte";
  import Footer from "$lib/components/navigation/Footer.svelte"
  import users from "../../../lib/images/users.png"

  export let data;
  const roomsResponse = data.roomsResponse;
  const usersResponse = data.usersResponse;
  let selectedRoom;

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
<Header userData={data.userResponse} jwt = {data.newAccessToken}/>

<div class="header-container">
  <div class="text-container">
    <h1>Welcome to Manage Users</h1>
    <h2>
      On this page you are able to add students from your institution to a specific room.
    </h2>
  </div>
  <img
    src={users}
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
      <option value={room.id}>{room.room_name}</option>
    {/each}
  </select>

  {#if selectedRoom}
    <h2>Users in the Institution:</h2>
    <ul class="user-list">
      {#each usersResponse as user}
        <li class="user-item">
          <label class="toggle-switch">
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
            <span class="slider"></span>
          </label>
          {user.username}
        </li>
      {/each}
    </ul>
    <PostAndDelete
      endpoint={"users/rooms"}
      postBody={{ assigned: addRoom }}
      deleteBody={{ removed: removeRoom }}
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
  margin: 30px;
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

  .user-list {
    list-style: none;
    padding: 0;
    margin: 16px 0;
    width: 100%;
  }

  .user-item {
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

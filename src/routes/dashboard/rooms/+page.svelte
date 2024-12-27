<script>
  import DeleteRequest from "$lib/components/requests/DeleteRequest.svelte";
  import Header from "$lib/components/navigation/Header.svelte";
  import Footer from "$lib/components/navigation/Footer.svelte"
  import Modal from "$lib/components/modal/Modal.svelte";
  import PostRequest from "$lib/components/requests/PostRequest.svelte";
  export let data;

  let showModal = false;
  let roomName;
  let roomsResponse = data.roomsResponse || [];

  const openModal = () => {
    showModal = true;
  }

  const submitRequest = async () => {
    showModal = false;
  }

  const deleteItems = (id) => {
    roomsResponse = roomsResponse.filter((room) => room.id !== id);
  };
</script>

<Header userData={data.userResponse} jwt={data.newAccessToken} />
<div class="header-container">
  <div class="text-container">
    <h1>Manage rooms</h1>
    <h2>
      On this page you are able to create and delete a room. A room is where you can add people and courses.
    </h2>
  </div>
  <img
    src="https://img.pikbest.com/png-images/school-building-cartoon-school-elements_5882542.png!w700wp"
    alt=""
  />
</div>
<div class="modal-btn-container">
  <button class="modal-btn" on:click={() => openModal()}>Create room</button>
</div>
<Modal bind:show={showModal}>
  <div class="modal-content">
    <input type="text" placeholder="Enter room name" bind:value={roomName} required />
    <PostRequest
      submit={submitRequest}
      jwt={data.newAccessToken}
      requestData={{ roomName: roomName, institutionId: data.userResponse.institution_id }}
      apiParam="rooms"
    />
  </div>
</Modal>

<div class="room-list">
  {#each roomsResponse as room (room.id)}
    <div class="room">
      <div>
        <h2>{room.room_name}</h2>
        <p>Institution ID: {room.institution_id}</p>
        <p>Number of Courses: {room.courses.length}</p>
      </div>
      <DeleteRequest
        id={room.id}
        apiParam="rooms"
        jwt={data.newAccessToken}
        {deleteItems}
      />
    </div>
  {/each}
</div>

<Footer />
<style>
  .modal-content {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  justify-content: center; /* Center items vertically */
  align-items: center; /* Center items horizontally */
  gap: 16px; /* Add spacing between items */
  padding: 16px; /* Optional: Add padding for inner content */
}

input {
  width: 80%; /* Adjust width to make it responsive */
  max-width: 400px; /* Optional: Set a maximum width */
  padding: 6px;
  margin-bottom: 16px;
  border: 2px solid #23cbc2;
  border-radius: 8px;
  color: #e4f5f6;
  background-color: #80808080; /* Same background as form */
  text-align: center; /* Center placeholder text */
}
  .modal-btn-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically (if needed) */
  margin: 20px 0; /* Add spacing above and below */
}
  .modal-btn {
    padding: 12px 24px;
    background-color: #23cbc2; /* Special color */
    color: #0e172b; /* Contrast text color */
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 1rem;
    justify-content: center;
    transition:
      background-color 0.3s,
      transform 0.2s;
  }

  .modal-btn:hover {
    background-color: #1f283b;
    color: #e4f5f6;
    transform: translateY(-3px);
  }
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
  .room-list {
    padding: 16px;
    background-color: #1f283b;
    width: 100%;
    max-width: 800px; /* Adjusted for better centering */
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 0 auto; /* Centers horizontally */
  }

  .room-list h1 {
    color: #e4f5f6;
    text-align: center;
    margin-bottom: 1rem;
  }

  .room {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #444;
    margin-bottom: 8px;
  }

  .room h2 {
    color: #e4f5f6;
    margin: 0;
  }

  .room p {
    color: #e4f5f6;
    margin: 4px 0;
    font-size: 0.9rem;
  }

  .delete-button {
    background-color: #23cbc2;
    color: #e4f5f6;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .delete-button:hover {
    background-color: #1f9e94;
  }
</style>

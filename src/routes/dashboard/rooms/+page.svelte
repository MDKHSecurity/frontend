<script>
  import DeleteRequest from "$lib/components/requests/DeleteRequest.svelte";
  import Header from "$lib/components/navigation/Header.svelte";
  import Footer from "$lib/components/navigation/Footer.svelte"

  export let data;
  let roomsResponse = data.roomsResponse || [];

  const deleteItems = (id) => {
    roomsResponse = roomsResponse.filter((room) => room.id !== id);
  };
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

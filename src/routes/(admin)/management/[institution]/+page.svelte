<script>
  export let data;
  import Header from "$lib/components/navigation/Header.svelte";
  import Footer from "$lib/components/navigation/Footer.svelte";
  import Modal from "../../../../lib/components/modal/Modal.svelte";
  import DeleteRequest from "../../../../lib/components/requests/DeleteRequest.svelte";
  import CreateRequest from "../../../../lib/components/requests/CreateRequest.svelte";

  let users = data.institutionResponse || [];
  const currentInstitutionId = data.institutionId || null;
  const availableRoles = data.rolesResponse || [];
  let showModal = false;
  let newUsers = [];
  let requestData = {
    email: "",
    role_id: "",
    institutionId: currentInstitutionId,
  };

  const openModal = () => {
    requestData.email = "";
    requestData.role_id = "";
    showModal = true;
  };

  const addUserToList = () => {
    if (requestData.email && requestData.role_id) {
      newUsers = [...newUsers, { ...requestData }];
      requestData.email = "";
      requestData.role_id = "";
    } else {
      alert("Please provide both an email and a role.");
    }
  };

  const submitUsers = (response) => {
    if (response.message) {
      users = [...users, ...newUsers];
      newUsers = [];
      showModal = false;
    } else {
      alert("There was an error while adding users.");
    }
  };

  const deleteItems = (id) => {
    users = users.filter((user) => user.id !== id);
  };

  const deleteTokens = (id) => {
    users = [...users.map(user => user.id === id ? { ...user, hasActiveToken: false } : user)];
  };

</script>
<Footer />
<Header userData={data.userResponse} jwt={data.newAccessToken} />
<main class="dashboard">
  <div class="header-container">
    <div class="text-container">
      <h1>welcome</h1>
      <h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        malesuada nisi tellus, non imperdiet nisi tempor at. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore.
      </h2>
    </div>
    <img
      src="https://img.pikbest.com/png-images/school-building-cartoon-school-elements_5882542.png!w700wp"
      alt=""
    />
  </div>

  <!-- User List Section -->
  <div class="sections-container">
    <section class="dashboard-section">
      <h2>Users</h2>
      <ul class="user-list">
        {#each users as user (user.id)}
          <li class="user-item">
            {user.username} - ID: {user.id}
            {#if user.hasActiveToken}
            <DeleteRequest
              id={user.id}
              apiParam="token"
              jwt={data.newAccessToken}
              {deleteTokens}
            />
            {/if}
            <DeleteRequest
              id={user.id}
              apiParam="users"
              jwt={data.newAccessToken}
              {deleteItems}
            />
          </li>
          <li></li>
        {/each}
      </ul>
      <button class="add-user-btn" on:click={openModal}>Add User</button>
    </section>
  </div>

  <!-- Modal for Adding Users -->
  <Modal bind:show={showModal} title="Add Users to Institution">
    <form on:submit|preventDefault={addUserToList}>
      <label class="modal-label">
        Email:
        <input
          type="email"
          bind:value={requestData.email}
          placeholder="Enter email"
          required
        />
      </label>
      <label class="modal-label">
        Role:
        <select bind:value={requestData.role_id} required>
          <option value="" disabled>Select Role</option>
          {#each availableRoles as role (role.id)}
            <option value={role.id}>{role.role_name}</option>
          {/each}
        </select>
      </label>
      <button type="button" on:click={addUserToList}>Add User to List</button>
      {#if newUsers.length > 0}
        <ul class="new-users-list">
          <h3>Users to be added:</h3>
          {#each newUsers as user (user.email)}
            <li>{user.email} - {user.role_id}</li>
          {/each}
        </ul>
      {/if}
      <CreateRequest
        jwt={data.newAccessToken}
        apiParam="users"
        requestData={{ institutionId: currentInstitutionId, users: newUsers }}
        onSubmit={submitUsers}
      />
    </form>
  </Modal>
</main>

<style>
  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: #e4f5f6;
    min-height: 100vh;
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
  .sections-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
  }

  .dashboard-section {
    flex: 1 1 calc(50% - 20px);
    border: 1px solid #444;
    border-radius: 8px;
    padding: 16px;
    background-color: #1f283b;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .user-list {
    margin: 0;
    padding: 0;
  }

  .user-item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;
  }

  .add-user-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    align-self: center;
    margin-top: 10px;
  }

  .add-user-btn:hover {
    background-color: #0056b3;
  }

  .modal-label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .new-users-list {
    margin: 10px 0;
    padding: 0;
  }

  .new-users-list h3 {
    margin-bottom: 5px;
  }

  .new-users-list li {
    margin: 5px 0;
  }
  input{
    padding: 8px;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #2c3e50;
    color: #e4f5f6;
  }
  select {
    padding: 8px;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #2c3e50;
    color: #e4f5f6;
  }
  button {
    padding: 12px;
    background-color: #23CBC2;
    color: #0E172B;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #1f9e94;
  }

  button:focus {
    outline: none;
  }
</style>

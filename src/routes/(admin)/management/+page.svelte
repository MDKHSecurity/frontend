<script>
  import Modal from "../../../lib/components/modal/Modal.svelte";
  import DeleteRequest from "../../../lib/components/requests/DeleteRequest.svelte";
  import CreateRequest from "../../../lib/components/requests/CreateRequest.svelte";
  import Header from "../../../lib/components/navigation/Header.svelte"
  

  export let data;
  let showModal = false;
  let modalContent = null;
  let modalTitle = "";
  let requestData = {};
  let apiParam = "";

  let availableInstitutions = data.institutionResponse || [];
  let availableRoles = data.rolesResponse || [];

  const openModal = (contentType, title, endpoint, institutionId = null) => {
    modalContent = contentType;
    modalTitle = title;
    apiParam = endpoint;
    requestData = {}; // Reset request data for new modal
    if (contentType === "institution") {
      requestData.institution_name = "";
      requestData.city = "";
      requestData.address = "";
      requestData.licens_amount = ""; // Initialize new fields for institution
    } else if (contentType === "users") {
      requestData.users = []; // Users as an array of objects: { email, role_id }
      requestData.institutionId = institutionId; // Add institution ID to the request data
    }
    showModal = true;
  };

  const addUser = () => {
    if (requestData.email && requestData.role_id) {
      // Add user to the list of users
      requestData.users = [
        ...requestData.users,
        { email: requestData.email.trim(), role_id: requestData.role_id }
      ];
      requestData.email = ""; // Clear email input
      requestData.role_id = ""; // Clear role selection
    } else {
      alert("Please provide both an email and a role for the user.");
    }
  };

  const removeUser = (index) => {
    // Remove user from the list by index
    requestData.users = requestData.users.filter((_, i) => i !== index);
  };

  const addNewItemToUI = (newItem) => {
    if (apiParam === "institutions") {
      availableInstitutions = [...availableInstitutions, newItem];
      showModal = false; // Close modal after adding institution
    } else if (apiParam === "users") {
      showModal = false; // Close modal after adding users
    }
  };

  const deleteItems = (id, type) => {
    if (type === "institutions") {
      availableInstitutions = availableInstitutions.filter(
        (institution) => institution.id !== id
      );
    } else if (type === "users") {

    }
  };

  const createUsers = () => {
    if (requestData.users.length > 0) {
      // Adjust the structure to send only the `users` array and `institutionId`
      const dataToSend = {
        users: requestData.users,  // Only send the list of users
        institutionId: requestData.institutionId // Include the institutionId
      };

      // Example API call can be placed here
      // createUsersAPI(dataToSend).then(response => {
      
      // After successful submission
      addNewItemToUI(requestData.users); // Add users to the availableUsers array
      requestData.users = []; // Clear users list
      showModal = false; // Close the modal after adding users
    }
  };

  const isCreateButtonDisabled = () => {
    // Check if there are any users with missing role_id
    return requestData.users.length === 0 || requestData.users.some(user => !user.role_id);
  };
</script>
<Header userData={data.userResponse} jwt = {data.newAccessToken}/>

<main>
  <h1>Admin Dashboard</h1>
  <!-- Container for sections -->
  <div class="sections-container">
    <!-- Institutions Section -->
    <section class="dashboard-section">
      <h2>Institutions</h2>
      <ul>
        {#each availableInstitutions as institution (institution.id)}
          <li>
            {institution.institution_name} - {institution.city} - {institution.address} -{" "}
            {institution.licens_amount}
            <DeleteRequest
              id={institution.id}
              apiParam="institutions"
              jwt={data.newAccessToken}
              deleteItems={deleteItems}
            />
            <button
              on:click={() =>
                openModal("users", "Add User to Institution", "users", institution.id)
              }
            >
              Add User
            </button>
          </li>
        {/each}
      </ul>
      <button on:click={() => openModal("institution", "Add Institution", "institutions")}>
        Add Institution
      </button>
    </section>
  </div>

  <!-- Modal -->
  <Modal bind:show={showModal} title={modalTitle}>
    <CreateRequest
      jwt={data.newAccessToken}
      {requestData}
      {apiParam}
      onSubmit={(newItem) => { 
        addNewItemToUI(newItem); 
      }}
    >
      <!-- Modal Content for Institutions -->
      {#if modalContent === "institution"}
        <label>
          Institution Name: <input bind:value={requestData.institution_name} required />
        </label>
        <label>
          City: <input bind:value={requestData.city} required />
        </label>
        <label>
          Address: <input bind:value={requestData.address} required />
        </label>
        <label>
          License Amount: <input type="number" bind:value={requestData.licens_amount} required />
        </label>
      {/if}

      <!-- Modal Content for Users -->
      {#if modalContent === "users"}
        <!-- Email Input Section -->
        <label>
          Add Email: <input type="email" bind:value={requestData.email} placeholder="Enter email" />
        </label>
        <label>
          Role:
          <select bind:value={requestData.role_id}>
            <option value="" disabled selected>Select Role</option>
            {#each availableRoles as role}
              <option value={role.id}>{role.role_name}</option>
            {/each}
          </select>
        </label>
        <button type="button" on:click={addUser}>
          Add User
        </button>

        <!-- Display List of Added Users -->
        <ul>
          {#each requestData.users as user, index}
            <li>
              {user.email} - Role: {#each availableRoles as role (role.id)}
                {#if role.id === user.role_id}{role.role_name}{/if}
              {/each}
              <button type="button" on:click={() => removeUser(index)}>Remove</button>
            </li>
          {/each}
        </ul>

        <!-- Institution ID -->
        <label>
          Institution ID: <input type="text" value={requestData.institutionId} disabled />
        </label>
      {/if}

    </CreateRequest>
  </Modal>
</main>

<style>
  .sections-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .dashboard-section {
    flex: 1 1 calc(50% - 20px);
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  section h2 {
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
  }

  li {
    margin: 0.5rem 0;
  }

  button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  button:hover {
    background-color: #0056b3;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>

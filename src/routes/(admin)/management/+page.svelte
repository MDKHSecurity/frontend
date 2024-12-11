<script>
  import Modal from "../../../lib/components/modal/Modal.svelte";
  import DeleteRequest from "../../../lib/components/requests/DeleteRequest.svelte";
  import CreateRequest from "../../../lib/components/requests/CreateRequest.svelte";
  import Header from "../../../lib/components/navigation/Header.svelte";
  import Footer from "$lib/components/navigation/Footer.svelte"

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
</script>

<Header userData={data.userResponse} jwt={data.newAccessToken} />

<main class="dashboard">
  <h1 class="dashboard-title">Admin Dashboard</h1>
  <!-- Container for sections -->
  <div class="sections-container">
    <!-- Institutions Section -->
    <section class="dashboard-section">
      <h2>Institutions</h2>
      <ul class="institution-list">
        {#each availableInstitutions as institution (institution.id)}
          <a href="https://localhost:5173/management/{institution.id}">
            <li class="institution-item">
              {institution.institution_name}
              <DeleteRequest
                id={institution.id}
                apiParam="institutions"
                jwt={data.newAccessToken}
                deleteItems={deleteItems}
              />
            </li>
          </a>
        {/each}
      </ul>
    </section>
    <button class="add-institution-btn" on:click={() => openModal("institution", "Add Institution", "institutions")}>
      Add Institution
    </button>
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
        <label class="modal-label">
          Institution Name: <input class="modal-input" bind:value={requestData.institution_name} required />
        </label>
        <label class="modal-label">
          City: <input class="modal-input" bind:value={requestData.city} required />
        </label>
        <label class="modal-label">
          Address: <input class="modal-input" bind:value={requestData.address} required />
        </label>
        <label class="modal-label">
          License Amount: <input type="number" class="modal-input" bind:value={requestData.licens_amount} required />
        </label>
      {/if}
    </CreateRequest>
  </Modal>
</main>
<Footer />
<style>
  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: #e4f5f6;
    min-height: 100vh;
  }

  .dashboard-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .sections-container {
    flex-wrap: wrap;
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

  .dashboard-section h2 {
    color: #e4f5f6;
    margin-bottom: 1rem;
  }

  .institution-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .institution-item {
    padding: 10px;
    border-bottom: 1px solid #444;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #e4f5f6;
    transition: background-color 0.3s ease;
  }

  .institution-item:hover {
    background-color: #2c3e50;
  }

  .add-institution-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #23cbc2;
    color: #e4f5f6;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .add-institution-btn:hover {
    background-color: #1f9e94;
  }

  .modal-label {
    display: block;
    margin-bottom: 10px;
  }

  .modal-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #2c3e50;
    color: #e4f5f6;
  }
</style>

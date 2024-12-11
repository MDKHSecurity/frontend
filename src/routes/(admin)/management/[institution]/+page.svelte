<script>
    export let data;
    import Header from '$lib/components/navigation/Header.svelte';
    import Modal from "../../../../lib/components/modal/Modal.svelte";
    import DeleteRequest from "../../../../lib/components/requests/DeleteRequest.svelte";
    import CreateRequest from "../../../../lib/components/requests/CreateRequest.svelte"; // 

    let users = data.institutionResponse || [];
    const currentInstitutionId = data.institutionId || null; 
    const availableRoles = data.rolesResponse || []; 

    let showModal = false;
    let newUsers = []; 
    let requestData = {
        email: "",
        role_id: "",
        institutionId: currentInstitutionId
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
        users = users.filter(user => user.id !== id);
    };
</script>

<Header userData={data.userResponse} jwt={data.newAccessToken} />

<h1>Institution Users</h1>

<!-- User List Section -->
<div class="sections-container">
    <section class="dashboard-section">
        <h2>Users</h2>
        <ul>
            {#each users as user}
                <li>
                    {user.username} - ID: {user.id}
                    <DeleteRequest
                        id={user.id}
                        apiParam="users"
                        jwt={data.newAccessToken}
                        deleteItems={deleteItems}
                    />
                </li>
            {/each}
        </ul>
        <button on:click={openModal}>Add User</button>
    </section>
</div>

<!-- Modal for Adding Users -->
<Modal bind:show={showModal} title="Add Users to Institution">
    <form on:submit|preventDefault={addUserToList}>
        <label>
            Email:
            <input
                type="email"
                bind:value={requestData.email}
                placeholder="Enter email"
                required
            />
        </label>
        <label>
            Role:
            <select bind:value={requestData.role_id} required>
                <option value="" disabled>Select Role</option>
                {#each availableRoles as role}
                    <option value={role.id}>{role.role_name}</option>
                {/each}
            </select>
        </label>
        <button type="button" on:click={addUserToList}>Add User to List</button>
        {#if newUsers.length > 0}
            <ul>
                <h3>Users to be added:</h3>
                {#each newUsers as user}
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

<style>
    .sections-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .dashboard-section {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 20px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    button {
        padding: 8px 16px;
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

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    h3 {
        margin-top: 10px;
    }
</style>

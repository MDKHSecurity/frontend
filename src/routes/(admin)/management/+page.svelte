<script>
    export let data;
    import CreateRequest from "../../../lib/components/requests/CreateRequest.svelte";
    import DeleteRequest from "../DeleteRequest.svelte";

    const institutions = data?.institutionData;

    let selectedInstitution = null;
    let requestData = {
        
    };

    let emailInputs = []; 

    const onInstitutionSelect = (institution) => {
        selectedInstitution = institution;
        requestData.institution_id = institution.id;
        emailInputs = []; 
    };

    const addEmailInput = () => {
        if (emailInputs.length < selectedInstitution.licens_amount) {
            emailInputs = [...emailInputs, ''];
        } else {
            alert(`Maximum of ${selectedInstitution.licens_amount} emails allowed.`);
        }
    };

    const removeEmailInput = (index) => {
        emailInputs = emailInputs.filter((_, i) => i !== index);
    };

    const onSubmitUsers = () => {
        requestData.users = emailInputs.filter(email => email.trim() !== ''); // Filter valid emails
        if (!requestData.institution_id || requestData.users.length === 0) {
            alert("Please select an institution and provide valid emails.");
            return;
        }

    };
</script>

<div class="page-container">
    <p class="intro-text">TO DO: CREATE/UPDATE/DELETE INSTITUTION M. ANTAL LICENCER + UDFRA ANTAL LICENCER CREATE/UPDATE/DELETE USERS</p>
    <h1 class="page-title">This is Management</h1>

    {#if institutions?.length > 0}
        <ul class="institution-list">
            {#each institutions as institution (institution.id)}
                <li class="institution-item">
                    <h2>{institution.institution_name}</h2>
                    <p>ID: {institution.id}</p>
                    <p>Licenses: {institution.licens_amount}</p>
                    <button on:click={() => onInstitutionSelect(institution)}>Generate Users</button>
                    <DeleteRequest jwt={data.jwt} apiParam={"institutions"} id={institution.id}/>
                </li>
            {/each}
        </ul>
    {:else}
        <p>No institutions available.</p>
    {/if}

    {#if selectedInstitution}
        <h2 class="form-title">Generate Users for {selectedInstitution.institution_name}</h2>
        <CreateRequest jwt={data.jwt} apiParam="auth/register" requestData={requestData}>
            <div class="input-group">
                <label for="institution">Institution ID</label>
                <input id="institution" value={selectedInstitution.id} readonly />
            </div>

            
            {#each emailInputs as email, index}
                <div class="input-group email-group">
                    <label for="email-{index}">User Email {index + 1}</label>
                    <div class="email-input-container">
                        <input
                            bind:value={emailInputs[index]}
                            id="email-{index}"
                            type="email"
                            placeholder="Enter user email"
                            required
                        />
                        <button type="button" class="remove-btn" on:click={() => removeEmailInput(index)}>Remove</button>
                    </div>
                </div>
            {/each}

            <button type="button" on:click={addEmailInput}>Add Email</button>

        
            <button type="submit" on:click|preventDefault={onSubmitUsers}>Submit Users</button>
        </CreateRequest>
    {/if}

    <h2 class="form-title">Create a New Institution</h2>
    <CreateRequest jwt={data.jwt} apiParam="institutions" requestData={requestData}>
        <div class="input-group">
            <label for="institution_name">Institution Name</label>
            <input bind:value={requestData.institution_name} id="institution_name" placeholder="Institution Name" required />
        </div>
        
        <div class="input-group">
            <label for="city">City</label>
            <input bind:value={requestData.city} id="city" placeholder="City" required />
        </div>

        <div class="input-group">
            <label for="address">Address</label>
            <input bind:value={requestData.address} id="address" placeholder="Address" required />
        </div>

        <div class="input-group">
            <label for="licens_amount">License Amount</label>
            <input bind:value={requestData.licens_amount} id="licens_amount" placeholder="License Amount" type="number" />
        </div>
    </CreateRequest>
</div>

<style>
   
    .page-container {
        max-width: 900px;
        margin: 20px auto;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .intro-text {
        font-size: 1.2rem;
        color: #666;
        margin-bottom: 20px;
    }

    .page-title {
        font-size: 2rem;
        color: #333;
        margin-bottom: 20px;
    }

    .institution-list {
        list-style: none;
        padding: 0;
    }

    .institution-item {
        background-color: #f9f9f9;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }

    .institution-item h2 {
        font-size: 1.6rem;
        color: #333;
    }

    .institution-item p {
        font-size: 1rem;
        color: #555;
    }

    .form-title {
        font-size: 1.6rem;
        color: #333;
        margin-top: 30px;
        margin-bottom: 15px;
    }

    .input-group {
        margin-bottom: 20px;
    }

    .input-group label {
        display: block;
        font-weight: bold;
        margin-bottom: 8px;
        font-size: 1rem;
    }

    .email-input-container {
        display: flex;
        align-items: center;
    }

    .email-input-container input {
        flex: 1;
    }

    .remove-btn {
        margin-left: 10px;
        background-color: #dc3545;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
    }

    .remove-btn:hover {
        background-color: #c82333;
    }

    button {
        padding: 10px 20px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
    }

    button:hover {
        background-color: #0056b3;
    }

    button:focus {
        outline: none;
    }
</style>

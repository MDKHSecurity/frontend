<script>
    let password = '';
    export let data;
    import { PUBLIC_BASE_URL } from "$env/static/public";
    import { goto } from '$app/navigation';
    
    const userId = data.tokensData.user_id;
    const token = data.token;
    const id = data.tokensData.token_id; // Assuming the token ID is part of `tokensData`


    const handleSubmit = async () => {

        try {
            // 1. Update the password
            const response = await fetch(`${PUBLIC_BASE_URL}api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({password}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data, "password update ")

                // 2. Once password update is successful, delete the token
                if (id) {
                    const deleteResponse = await fetch(`${PUBLIC_BASE_URL}api/tokens/${id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        }
                    });
                    console.log(deleteResponse, "<-- DeleteResoose")
                    if (deleteResponse.ok) {
                        const deleteData = await deleteResponse.json();

                        goto('/login');
                    } else {
                        const deleteErrorData = await deleteResponse.json();
                        console.error("Error deleting token:", deleteErrorData);
                    }
                }
            } else {
                const errorData = await response.json();
                console.error("Error updating password:", errorData);
            }
        } catch (err) {
            console.error("Error during password update:", err);
        }
    };
</script>

<div class="password-prompt">
    <form on:submit|preventDefault={handleSubmit}>
        <label for="password">Enter your password:</label>
        <input
            type="password"
            id="password"
            bind:value={password}
            placeholder="Enter your password"
        />
     
        <button type="submit">Submit</button>
    </form>
</div>

<style>
    .password-prompt {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem;
    }

    label {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }

    input[type="password"] {
        width: 100%;
        max-width: 300px;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 0.5rem;
    }


    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>

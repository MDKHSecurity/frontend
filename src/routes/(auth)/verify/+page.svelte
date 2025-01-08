<script>
    let password = '';
    export let data;
    import { PUBLIC_BASE_URL } from "$env/static/public";
    import { goto } from '$app/navigation';
    import { handleResponse } from "$lib/components/utils/handleResponse.js";
    const userId = data.tokensData.user_id;
    const token = data.token;
    const id = data.tokensData.token_id; 


    const handleSubmit = async () => {

        try {
            
            const request = await fetch(`${PUBLIC_BASE_URL}api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({password: password, token: token}),
            });
            await handleResponse(request);

            if (request.ok) {

                // 2. Once password update is successful, delete the token
                if (id) {
                    const deleteResponse = await fetch(`${PUBLIC_BASE_URL}api/tokens/${id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        }
                    });
                    if (deleteResponse.ok) {
                        const deleteData = await deleteResponse.json();

                        goto('/login');
                    } else {
                        const deleteErrorData = await deleteResponse.json();
                        console.error("Error deleting token:", deleteErrorData);
                    }
                }
            } else {
                const errorData = await request.json();
                console.error("Error updating password:", errorData);
            }
        } catch (err) {
            console.error("Error during password update:", err);
        }
    };
</script>

<div class="password-prompt">
    <form on:submit|preventDefault={handleSubmit}>
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: #0E172B; /* Removed background */
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100; /* Ensure it's on top of other elements */
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  ::placeholder {
    color: #E4F5F6; /* Darker text color for readability */
    margin-bottom: 8px;
    text-align: center;
  }

  input {
    padding: 12px;
    margin-bottom: 16px;
    border: 2px solid #23cbc2;
    border-radius: 8px;
    color: #E4F5F6;
    background-color: #80808080; /* Same background as form */
    text-align: center;
  }

  button {
    width: 100%;
    padding: 12px;
    background-color: #23cbc2;
    color: #E4F5F6;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #66bb6a;
  }
</style>

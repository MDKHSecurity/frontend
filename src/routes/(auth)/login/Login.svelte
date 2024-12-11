<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
  import { handleResponse } from "../../../lib/components/utils/handleResponse.js";
  import { goto } from "$app/navigation";
  import { toast } from "@zerodevx/svelte-toast";
  import { error } from "@sveltejs/kit";
  
  let email = "";
  let password = "";

  const handleLogin = async () => {
    const data = { email, password };

    try {
      const response = await fetch(`${PUBLIC_BASE_URL}api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      await handleResponse(response, "/");

    } catch (error) {
      console.error("Error during login:", error);
    }
  };
</script>

<div class="login">
  <form on:submit|preventDefault={handleLogin}>
    <input bind:value={email} id="email" type="email" placeholder="Insert email"/>
    <input bind:value={password} id="password" type="password" placeholder="Insert password" />
    <button id="submit" type="submit">Login</button>
  </form>
</div>

<style>
  .login {
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

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
    <label for="email">Email</label>
    <input bind:value={email} id="email" type="email"/>
    <label for="password">Password</label>
    <input bind:value={password} id="password" type="password" />
    <button id="submit" type="submit">Login</button>
  </form>
</div>

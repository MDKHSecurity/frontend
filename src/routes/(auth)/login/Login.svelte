<script>
import { PUBLIC_BASE_URL } from "$env/static/public";
let email, password;

const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    await fetch(`${PUBLIC_BASE_URL}api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.status === 200) {
        location.href = "/";
      }
      if (res.status === 400) {
        location.href = "/login";
      }
    });
  };
</script>
<div class="login">
    <form on:submit|preventDefault={handleLogin}>
      <label for="email">Email</label>
      <input bind:value={email} id="email" />
  
      <label for="password">Password</label>
      <input bind:value={password} id="password" type="password" />
  
      <button
        id="submit"
        type="submit">Login</button
      >
    </form>
  </div>
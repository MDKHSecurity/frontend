<script>
    // import toast from "svelte-french-toast";
    import { PUBLIC_BASE_URL } from "$env/static/public";
    // export let artistName;
  
    const logOut = async () => {
      await fetch(`${PUBLIC_BASE_URL}api/auth/logout`, {
        method: "GET",
        credentials: "include",
      }).then(async (res) => {
        
        const responseBody = await res.json();
        if (res.status === 200) {
          location.href("/login")
          //Toaster success update
        }
        if (res.status === 500) {
          location.href("/")
        }
      })
    };
  </script>
  
  <form on:submit|preventDefault={logOut}>
    <button type="submit">Logout</button>
  </form>
  

<style>

</style>
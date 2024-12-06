<script>
    import { PUBLIC_BASE_URL } from "$env/static/public";
    import { handleResponse } from "../utils/handleResponse.js";
    
  
    const logOut = async () => {
      try{
        const request = await fetch(`${PUBLIC_BASE_URL}api/auth/logout`, {
        method: "GET",
        credentials: "include",
      })
      await handleResponse(request, "/login")
      }catch(error){
        console.log(error)
      }
    };

  </script>
  
  <form on:submit|preventDefault={logOut}>
    <button type="submit">Logout</button>
  </form>
  

<style>

</style>
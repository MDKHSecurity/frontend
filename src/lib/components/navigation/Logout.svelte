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
  button {
    padding: 12px 24px;
    background-color: #23cbc2; /* Special color */
    color: #0e172b; /* Contrast text color */
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 1rem;
    transition:
      background-color 0.3s,
      transform 0.2s;
  }

  button:hover {
    background-color: #1f283b;
    color: #e4f5f6;
    transform: translateY(-3px);
  }
</style>
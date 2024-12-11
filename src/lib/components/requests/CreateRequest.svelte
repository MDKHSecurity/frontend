<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
  import { handleResponse } from "../utils/handleResponse.js";
  import { logErrorToFile } from "../logErrorToFile/logErrorToFile.js";
  export let jwt;
  export let requestData = {};  
  export let apiParam;
  export let onSubmit;

  const requestDataResponse = async () => {
    try {
      const request = await fetch(`${PUBLIC_BASE_URL}api/${apiParam}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(requestData),
      });
      
      const handle = await handleResponse(request);
      onSubmit(handle);
    } catch (error) {
      logErrorToFile(error, jwt);
    }
  };
</script>

<div class="form-container">
  <form on:submit|preventDefault={requestDataResponse}>
    <slot></slot>  
    <button id="submit" type="submit">Create {apiParam}</button>
  </form>
</div>

<style>
  .form-container {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #1F283B;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    
  }

  button {
    padding: 12px;
    background-color: #23CBC2;
    color: #0E172B;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #1f9e94;
  }

  button:focus {
    outline: none;
  }
</style>

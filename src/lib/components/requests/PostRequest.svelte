<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
  import { handleResponse } from "../utils/handleResponse.js";
  import { logErrorToFile } from "../logErrorToFile/logErrorToFile.js";
  export let jwt;
  export let requestData = {};  
  export let apiParam;
  export let submit;   
  export let disabled = false;

  const request = async () => {
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

          await handleResponse(request);
      } catch (error) {
          logErrorToFile(error, jwt)
      }
  };

  const handleButtonClick = async () => {
      await submit();

      await request();
  };
</script>

<div class="create">
  <button on:click={handleButtonClick} disabled={disabled}>Submit Changes</button>
</div>

<style>
.create {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
}

button {
    padding: 12px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

button:disabled {
      background-color: #d6d6d6;
      cursor: not-allowed;
  }
</style>

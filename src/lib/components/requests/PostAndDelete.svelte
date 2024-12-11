<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
  import { handleResponse } from "../utils/handleResponse.js";
  import { logErrorToFile } from "../logErrorToFile/logErrorToFile.js";
  export let endpoint;
  export let postBody;
  export let deleteBody;
  export let jwt;
  export let updateAssigned;
  export let updateDeleted;

  const makePostRequest = async () => {
    try {
      if (postBody.assigned.length === 0) {
        return;
      }
      const request = await fetch(`${PUBLIC_BASE_URL}api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(postBody),
      });
      const handle = await handleResponse(request);
      updateAssigned(handle);
    } catch (error) {
      logErrorToFile(error, jwt);
    }
  };

  const makeDeleteRequest = async () => {
    try {
      if (deleteBody.removed.length === 0) {
        return;
      }
      const request = await fetch(`${PUBLIC_BASE_URL}api/${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(deleteBody),
      });

      const handle = await handleResponse(request);
      updateDeleted(handle);
    } catch (error) {
      logErrorToFile(error, jwt);
    }
  };

  const handleButtonClick = async () => {
    await makePostRequest();
    await makeDeleteRequest();
  };
</script>

<button on:click={() => handleButtonClick()}>Submit Changes</button>

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
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
      const handle = await handleResponse(request);
    } catch (error) {
      logErrorToFile(error, jwt);
    }
  };

  const handleButtonClick = async () => {
    await submit();

    await request();
  };
</script>

<div class="create">
  <button on:click={handleButtonClick} {disabled}>Submit Changes</button>
</div>

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

  button:disabled {
    background-color: #666; /* Disabled button style */
    color: #ccc;
    cursor: not-allowed;
  }
</style>

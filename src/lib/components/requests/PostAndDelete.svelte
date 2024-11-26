<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
  export let endpoint;
  export let postBody;
  export let deleteBody;
  export let jwt;
  export let updateAssigned;
  export let updateDeleted;

  const makePostRequest = async () => {
      if (postBody.assigned.length === 0) {
          return;
      }
      try {
          const request = await fetch(`${PUBLIC_BASE_URL}api/${endpoint}`, {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${jwt}` 
              },
              body: JSON.stringify(postBody)
          }).then(async (res) => {
            const response = await res.json();
            updateAssigned(response)
          });
      } catch (error) {
          console.error('Error making POST request:', error);
      }
  };

  const makeDeleteRequest = async () => {
      if (deleteBody.removed.length === 0) {
          return;
      }
      try {
          const request = await fetch(`${PUBLIC_BASE_URL}api/${endpoint}`, {
              method: 'DELETE',
              headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${jwt}` 
              },
              body: JSON.stringify(deleteBody)
          }).then(async (res) => {
            const response = await res.json();
            updateDeleted(response)
          });;
      } catch (error) {
          console.error('Error making DELETE request:', error);
      }
  };

  const handleButtonClick = async () => {
      await makePostRequest();
      await makeDeleteRequest();
  };
</script>

<button on:click={() => handleButtonClick()}>Submit Changes</button>
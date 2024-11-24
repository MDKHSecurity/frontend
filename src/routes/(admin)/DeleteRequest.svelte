<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";

  export let id;
  export let apiParam;
  export let jwt;
  export let deleteItems;

  const deleteFunction = async () => {
      const response = await fetch(`${PUBLIC_BASE_URL}api/${apiParam}/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }).then(async (res) => {
        deleteItems(id, apiParam);
    });
  };
</script>

<div class="delete-container">
  <button on:click={() => deleteFunction()} id="delete-btn">Delete {apiParam}</button>
</div>

<style>
  .delete-container {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  #delete-btn {
    padding: 12px 20px;
    background-color: #FF4D4D;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  #delete-btn:hover {
    background-color: #D43939;
  }

  #delete-btn:focus {
    outline: none;
  }

  #delete-btn:active {
    transform: scale(0.98);
  }


</style>

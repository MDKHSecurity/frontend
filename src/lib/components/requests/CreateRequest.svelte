<script>
    import { PUBLIC_BASE_URL } from "$env/static/public";
    export let jwt;
    export let requestData = {};  
    export let apiParam;
    export let onSubmit; 
    
    const requestDataResponse = async () => {
      const response = await fetch(`${PUBLIC_BASE_URL}api/${apiParam}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const newItem = await response.json(); 
        onSubmit(newItem); 
      } else {
        console.error("Failed to submit the data.");
      }
    };
  </script>
  
  <div class="forum-create">
    <form on:submit|preventDefault={requestDataResponse}>
      <slot></slot>  
      <button id="submit" type="submit">Create {apiParam}</button>
    </form>
  </div>
  
  <style>
    .forum-create {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
      border-radius: 8px;
      background-color: #f9f9f9;
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
  
    button:focus {
      outline: none;
    }
  </style>
  
<script>
    import { PUBLIC_BASE_URL } from "$env/static/public";
    export let jwt;
    export let show = false;
    export let close = () => {};
  </script>
  

  {#if show}
  <div class="backdrop" on:click={close}>
    <div class="modal" on:click|stopPropagation>
        
    </div>
</div>
  {/if}


<style>
  .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .modal {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: relative;
      width: 400px;
      text-align: center;
  }
  .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1rem;
      cursor: pointer;
  }
  .navigation {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
  }
</style>

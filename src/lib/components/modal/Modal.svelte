<script>
  export let show = false; 
  export let title = ""; 
  const closeModal = () => {
    show = false; 
  };
</script>

{#if show}
  <div class="modal-backdrop" on:click={closeModal}></div>
  <div class="modal">
    <header>
      <h2>{title}</h2>
      <button class="close-btn" on:click={closeModal}>&times;</button>
    </header>
    <div class="modal-content">
      <slot></slot> 
    </div>
    <footer>
      <slot name="footer"></slot> 
    </footer>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1F283B; /* Updated background color */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    width: 90%;
    max-width: 500px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    color: #e4f5f6; /* Updated text color */
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #23CBC2; /* Updated color for close button */
  }

  .modal-content {
    margin-bottom: 15px;
    color: #e4f5f6; /* Updated content text color */
  }

  footer {
    text-align: center;
    color: #e4f5f6; /* Updated footer text color */
  }
</style>

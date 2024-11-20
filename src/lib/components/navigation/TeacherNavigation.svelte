<script>
  import ModalClassroom from "../modal/ModelClassroom.svelte";
  let showModal = false;

  const openModal = () => {
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
  };
</script>
<a href="/dashboard">Home</a>
      <a href="/dashboard/course">Enroll course</a>
      <a href="/dashboard/statistics">Classroom Statistics</a>
      <a href="/dashboard/content">Course content</a>
<button class="open-modal-btn" on:click={openModal}>Create classroom</button>

<ModalClassroom show={showModal} close={closeModal} />

<style>
    a {
      color: #e0e1dd;
      margin-right: 0.625em;
      text-decoration: none;
      font-weight: bold;
      font-size: 1em;
      text-transform: capitalize;

      &:hover {
        color: #778da9;
      }
    }
    .open-modal-btn {
      background-color: #4caf50;
      color: white;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition:
        background-color 0.3s,
        transform 0.2s;
    }
</style>
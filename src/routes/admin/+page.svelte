<script>
    import Modal from "../../lib/components/modal/Modal.svelte";
    export let data;
    let showModal = false;

    const openModal = () => {
        showModal = true;
    };

    const closeModal = () => {
        showModal = false;
    };
</script>

<div class="container">
    <h1>Welcome to the Course Builder</h1>
    <p>Click the button below to start creating your course.</p>
    <button class="open-modal-btn" on:click={openModal}>Open Modal</button>  
</div>

<Modal jwt={data.jwt} show={showModal} close={closeModal} />

<style>
    /* Container Styling */
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
        font-family: 'Arial', sans-serif;
        text-align: center;
    }

    h1 {
        font-size: 2.5rem;
        color: #333;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.25rem;
        color: #666;
        margin-bottom: 2rem;
    }

    .open-modal-btn {
        background-color: #4CAF50;
        color: white;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s, transform 0.2s;
    }

    .open-modal-btn:hover {
        background-color: #45a049;
        transform: scale(1.05);
    }

    .open-modal-btn:active {
        transform: scale(1);
    }
</style>

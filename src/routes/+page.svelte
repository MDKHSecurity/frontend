<!-- <script>    
    export let data;
    import Modal from "../lib/components/modal/Modal.svelte"
    let showModal = false;
    const videos = data.responseData.data
</script>

<div>
    <button on:click={() => (showModal = true)}>Open Modal</button>
    <Modal show={showModal} close={() => (showModal = false)}>
        <h1>Modal Content</h1>
        <p>This is a simple modal component in Svelte.</p>
    </Modal>
    <p>hello world</p>
    {#each videos as video}
    <p>{video.video_name}</p>
    <p>{video.length}</p>
    {/each}
</div> -->
<h1>hello</h1>



  
<script>    
    export let data;
    const videos = data.responseData.data
</script>

<div>
    <p>hello world</p>
    {#each videos as video}
    <p>{video.video_name}</p>
    <p>{video.length}</p>
    {/each}
</div>
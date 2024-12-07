<script>
    import DeleteRequest from "$lib/components/requests/DeleteRequest.svelte";
    import Header from "$lib/components/navigation/Header.svelte";
    export let data;
    let roomsResponse = data.roomsResponse || [];

    const deleteItems = (id) => {
        roomsResponse = roomsResponse.filter((room) => room.id !== id);
    };
</script>
<Header userData={data.userResponse} jwt = {data.newAccessToken}/>

<div class="room-list">
    <h1>Rooms</h1>
    {#each roomsResponse as room (room.id)}
        <div class="room">
            <div>
                <h2>{room.room_name}</h2>
                <p>Institution ID: {room.institution_id}</p>
                <p>Number of Courses: {room.courses.length}</p>
            </div>
            <DeleteRequest 
                id={room.id} 
                apiParam="rooms" 
                jwt={data.newAccessToken} 
                {deleteItems}
            />
        </div>
    {/each}
</div>
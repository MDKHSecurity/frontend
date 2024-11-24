<script>
    import Header from"../lib/components/navigation/header.svelte";
    export let data;
</script>

<Header userData={data.userData} jwt = {data.jwt}/>
<slot/>
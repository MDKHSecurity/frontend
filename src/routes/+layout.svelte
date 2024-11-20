<script>
    import Header from"../lib/components/navigation/Header.svelte";
    export let data;
</script>

<Header userData={data.userData} jwt = {data.jwt}/>
<slot/>
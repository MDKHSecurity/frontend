<script>
    import Header from "../lib/components/navigation/Header.svelte";
    export let data;

</script>

<Header role={data.userData.role_name}/>
<slot/>
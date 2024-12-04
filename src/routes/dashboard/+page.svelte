<script>
    import Header from "../../lib/components/navigation/Header.svelte"
    export let data;
    console.log(data)
</script>
<Header userData={data.userResponse} jwt = {data.jwt}/>

<h1>Welcome to dashboard</h1>

<style></style>
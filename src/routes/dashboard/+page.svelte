<script>
    import Header from "../../lib/components/navigation/Header.svelte"
    import Footer from "$lib/components/navigation/Footer.svelte"
    export let data;
    console.log(data)
</script>
<Header userData={data.userResponse} jwt = {data.newAccessToken}/>

<h1>Welcome to dashboard name: {data.userResponse.username}</h1>

<Footer />
<style></style>
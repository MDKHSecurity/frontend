<script>
    export let data;
    import Header from '$lib/components/navigation/header.svelte';
</script>
<Header userData={data.userResponse} jwt = {data.jwt}/>

<h1>Refreshing Tokens...</h1>
<p>The tokens are being refreshed automatically when this page loads.</p>

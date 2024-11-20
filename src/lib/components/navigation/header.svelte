<script>
  import { env } from "$env/dynamic/public";
  import TeacherNavigation from "./TeacherNavigation.svelte";
  export let userData;
  export let jwt;
</script>

<div class="header">
  <div>
    <a href="/">Home</a>
  </div>
  
  {#if userData.role_name === "teacher"}
    <div>
      <TeacherNavigation/>
    </div>
  {/if}

  {#if userData.role_name === "admin"}
    <div>
      <a href="/content">Content</a>
      <a href="/management">Management</a>
    </div>
  {/if}
</div>

<style lang="scss">
  .header {
    background-color: #0d1b2a;
    color: #e0e1dd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25em;
    -webkit-box-shadow: 5px 5px 15px 5px #0d1b2a;
    box-shadow: 5px 5px 15px 5px #0d1b2a;
    margin-bottom: 2.75em;

    a {
      color: #e0e1dd;
      margin-right: 0.625em;
      text-decoration: none;
      font-weight: bold;
      font-size: 1em;
      text-transform: capitalize;

      &:hover {
        color: #778da9;
      }
    }

    .home {
      height: 3.75em;
    }

    .messages {
      position: relative;

      &::after {
        content: "new message";
        position: absolute;
        top: -0.625em;
        right: -0.625em;
        background-color: #415a77;
        color: #e0e1dd;
        font-size: 0.625em;
        padding: 0.125em 0.25em;
        border-radius: 0.25em;
      }
    }

    .profile-image {
      height: 2.5em;
      width: 2.5em;
      border-radius: 50%;
      margin-left: 0.625em;
    }

    .dashboard-link {
      margin-left: 0.625em;
    }

    .logout {
      margin-right: 0.625em;
    }
  }
</style>

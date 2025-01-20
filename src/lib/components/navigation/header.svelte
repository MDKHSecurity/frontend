<script>
  import { env } from "$env/dynamic/public";
  import Logout from "./Logout.svelte";
  export let userData;
  export let jwt;
  import logo from "../../images/logo.png"
</script>

<div class="header">
  <!-- Left-aligned Icon -->
  <a href="/" class="logo">
    <!-- Replace with an actual SVG or an image for the icon -->
    <img src={logo} alt="Logo" class="nav-icon" />
  </a>
  
  <!-- Navigation Links -->
  <div class="nav-links">
    {#if userData === null}
      <!-- User not logged in -->
      <a href="/login" class="nav-link">Login</a>
    {:else if userData.role_name === "admin"}
      <!-- <a href="/dashboard" class="nav-link">Home</a> -->
      <a href="/dashboard/course" class="nav-link">Enroll course</a>
      <a href="/dashboard/users" class="nav-link">Manage users</a>
      <a href="/dashboard/rooms" class="nav-link">Manage rooms</a>
      <a href="/dashboard/statistics" class="nav-link">Course statistics</a>
    {:else if userData.role_name === "owner"}
      <!-- Owner role -->
      <a href="/content" class="nav-link">Content</a>
      <a href="/management" class="nav-link">Management</a>
    {/if}
  </div>
  
  <Logout />
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #0E172B; /* Dark background */
    color: #E4F5F6;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100; /* Ensure it's on top of other elements */
  }

  .logo {
    display: flex;
    align-items: center;
    color: #E4F5F6;
  }

  .nav-icon {
    width: 130px; /* Adjust size as needed */
    height: 30px; /* Adjust size as needed */
  }

  .nav-links {
    display: flex;
    gap: 16px; /* Space between links */
  }

  .nav-link {
    color: #E4F5F6;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .nav-link:hover {
    color: #23cbc2; /* Change color on hover */
  }
</style>

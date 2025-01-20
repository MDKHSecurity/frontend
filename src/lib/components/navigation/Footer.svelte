<script>
  export let privacyUrll = "#"; // Placeholder URL for privacy policy
  export let termsUrl = "#"; // Placeholder URL for terms of service
  export let contactUrl = "#"; // Placeholder URL for contact page
  import privacyUrl from "$lib/Privacy Policies MDKHSecurity.pdf"
</script>

<footer class="footer">
  <div class="footer-content">
    <span class="copyright">
      &copy; {new Date().getFullYear()} Your Company. All rights reserved.
    </span>
    <nav class="footer-nav">
      <a href={privacyUrl} class="footer-link">Privacy Policy</a>
      <!-- <a href={termsUrl} class="footer-link">Terms of Service</a>
      <a href={contactUrl} class="footer-link">Contact Us</a> -->
    </nav>
  </div>
</footer>

<style>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #0E172B; /* Dark background */
    color: #E4F5F6;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100; /* Ensure it's below the header */
    max-width: 1200px;
    margin-left: 0px; /* Adjust to match body left margin */
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .copyright {
    flex: 1;
    font-size: 14px;
  }

  .footer-nav {
    display: flex;
    gap: 16px;
  }

  .footer-link {
    color: #23cbc2;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: #1f9e94; /* Change color on hover */
  }
</style>

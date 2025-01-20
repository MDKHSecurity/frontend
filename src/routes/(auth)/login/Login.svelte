<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
  import { goto } from "$app/navigation";
  import { toast } from "@zerodevx/svelte-toast";

  let email = "";
  let password = "";
  let twoFACode = "";
  let qrCode = ""; 
  let userId = ""; 
  let modalState = null; // null, '2FA_REQUIRED', 'ENABLE_2FA', or 'SHOW_QR_CODE'

  const handleLogin = async () => {
  try {
    const response = await fetch(`${PUBLIC_BASE_URL}api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    console.log("Login result:", result);

    userId = result.userId;

    if (result.message === "2FA token required") {
      modalState = "2FA_REQUIRED"; // Show 2FA input modal
    } else if (result.twoFAEnabled === 0) {
      modalState = "ENABLE_2FA"; // Show enable 2FA modal
    } else {
      // If login is successful without additional steps, redirect immediately.
      toast.push("Login successful!", { type: "success" });
      goto("/"); // Redirect after successful login
    }
  } catch (err) {
    console.error("Error during login:", err);
    toast.push("An error occurred. Please try again.", { type: "error" });
  }
};


  const verify2FACode = async () => {
    try {
      const response = await fetch(`${PUBLIC_BASE_URL}api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password, twofaToken: twoFACode }),
      });

      const result = await response.json();
      console.log(result, "THIS IS RESULT")
      if (response.status === 200 && result.twoFAEnabled === 1) {
        modalState = null; // Close modal
        goto("/"); // Redirect after successful login
      } else {
        toast.push("Invalid 2FA code. Please try again.", { type: "error" });
      }
    } catch (err) {
      console.error("Error verifying 2FA code:", err);
      toast.push("An error occurred. Please try again.", { type: "error" });
    }
  };

  const enable2FA = async () => {
    try {
      const response = await fetch(`${PUBLIC_BASE_URL}api/auth/enable-2fa`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id: userId, email }),
      });

      const result = await response.json();
      qrCode = result.qrCode; // Display QR code
      modalState = "SHOW_QR_CODE"; // Switch modal state
    } catch (err) {
      console.error("Error enabling 2FA:", err);
      toast.push("Error enabling 2FA. Please try again.", { type: "error" });
    }
  };

  const confirm2FASetup = async () => {
    try {
      const response = await fetch(`${PUBLIC_BASE_URL}api/auth/verify-2fa`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ twoFACode, userId }),
      });

      const result = await response.json();
      if (result.success) {
        toast.push("2FA enabled successfully!", { type: "success" });
        modalState = null; // Close modal
        goto("/"); // Redirect after enabling 2FA
      } else {
        toast.push("Failed to enable 2FA. Please try again.", { type: "error" });
      }
    } catch (err) {
      console.error("Error confirming 2FA setup:", err);
      toast.push("An error occurred. Please try again.", { type: "error" });
    }
  };
</script>

<!-- Modals -->
{#if modalState === "2FA_REQUIRED"}
  <div class="modal">
    <div class="modal-content">
      <p>Enter the 2FA token from your authenticator app:</p>
      <input
        bind:value={twoFACode}
        type="text"
        placeholder="Enter 2FA code"
      />
      <button type="button" on:click={verify2FACode}>Submit</button>
    </div>
  </div>
{:else if modalState === "ENABLE_2FA"}
  <div class="modal">
    <div class="modal-content">
      <p>Do you want to enable two-factor authentication?</p>
      <button type="button" on:click={enable2FA}>Yes</button>
      <button type="button" on:click={() => goto("/")}>No</button>
    </div>
  </div>
{:else if modalState === "SHOW_QR_CODE"}
  <div class="modal">
    <div class="modal-content">
      <p>Scan this QR code with your authenticator app:</p>
      <img src={qrCode} alt="QR Code for 2FA" />
      <input
        bind:value={twoFACode}
        type="text"
        placeholder="Enter the 6-digit code"
      />
      <button type="button" on:click={confirm2FASetup}>Enable 2FA</button>
      <button type="button" on:click={() => goto("/")}>Cancel</button>
    </div>
  </div>
{/if}

<!-- Login Form -->
<div class="login">
  <form on:submit|preventDefault={handleLogin}>
    <input bind:value={email} id="email" type="email" placeholder="Insert email" />
    <input bind:value={password} id="password" type="password" placeholder="Insert password" />
    <button id="submit" type="submit">Login</button>
  </form>
</div>

<style>
  /* Login Form Styling */
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: #0E172B;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  ::placeholder {
    color: #E4F5F6;
    margin-bottom: 8px;
    text-align: center;
  }

  input {
    padding: 12px;
    margin-bottom: 16px;
    border: 2px solid #23cbc2;
    border-radius: 8px;
    color: #E4F5F6;
    background-color: #80808080;
    text-align: center;
  }

  button {
    width: 100%;
    padding: 12px;
    background-color: #23cbc2;
    color: #E4F5F6;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #66bb6a;
  }

  /* Modal Styling */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1F283B;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    width: 90%;
    max-width: 500px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    color: #e4f5f6;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #23CBC2;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center; /* Horizontally center */
    justify-content: center; /* Vertically center */
    margin-bottom: 15px;
    color: #e4f5f6;
    text-align: center; /* Center text content */
  }

  .modal-content img {
    max-width: 100%; /* Ensure it scales within the container */
    height: auto; /* Maintain aspect ratio */
    margin: 16px 0; /* Add some spacing around the QR code */
  }

  footer {
    text-align: center;
    color: #e4f5f6;
  }

  .modal-content input {
    padding: 12px;
    margin-bottom: 16px;
    border: 2px solid #23cbc2;
    border-radius: 8px;
    color: #E4F5F6;
    background-color: #80808080;
    text-align: center;
    width: 100%;
  }

  .modal-content button {
    margin-top: 10px;
    width: 100%;
    padding: 12px;
    background-color: #23cbc2;
    color: #E4F5F6;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .modal-content button:hover {
    background-color: #66bb6a;
  }
</style>


import { PUBLIC_BASE_URL } from "$env/static/public";

export default async function refreshTokens(jwt, refreshToken) {
  try {
    const response = await fetch(`${PUBLIC_BASE_URL}api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    // Check response status
    if (response.ok) {
      const data = await response.json();
      console.log("Token refreshed successfully", data);
      // Optionally: Display success message with toaster here
      return data;
    }

    return null; // Return null for any non-200 responses
  } catch (error) {
    console.error("Error during token refresh:", error);
    return null;
  }
}

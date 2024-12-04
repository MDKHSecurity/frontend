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
        refreshToken: refreshToken
      }),
    });

    // if (!response.ok) {
    //   window.location.href = "/login"
    // }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during token refresh:", error);
    return null;
  }
}
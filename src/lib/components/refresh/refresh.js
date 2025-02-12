import { PUBLIC_BASE_URL } from "$env/static/public";
import { logErrorToFile } from "../logErrorToFile/logErrorToFile.js";
export default async function refreshTokens(accessToken, refreshToken, fetch) {
  try {
    const response = await fetch(`${PUBLIC_BASE_URL}api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    // Check response status
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    
    return null;
  } catch (error) {
    logErrorToFile(error, accessToken)
  }
}
import { PUBLIC_BASE_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import refreshTokens from "../../../../lib/components/refresh/refresh.js";
export const load = async ({ data, fetch }) => {

  const { jwt, refreshToken, institutionId } = data;

  const refreshedData = await refreshTokens(jwt, refreshToken, fetch);
  if (refreshedData !== null) {
    const newAccessToken = refreshedData.newAccessToken;

    const userRequest = await fetch(`${PUBLIC_BASE_URL}api/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${newAccessToken}`,
      },
    });

    const userResponse = await userRequest.json();
    if (!userResponse.role_name) {
      throw redirect(302, "/login");
    }
    const institutionRequest = await fetch(`${PUBLIC_BASE_URL}api/users/${institutionId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${newAccessToken}`,
      },
    });

    const institutionResponse = await institutionRequest.json();
    

    const rolesRequest = await fetch(`${PUBLIC_BASE_URL}api/roles`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${newAccessToken}`,
      },
    });

    const rolesResponse = await rolesRequest.json();
    return {
      userResponse,
      institutionResponse,
      newAccessToken,
      rolesResponse,
      institutionId
    };
  } else {
    throw redirect(302, "/login");
  }
};

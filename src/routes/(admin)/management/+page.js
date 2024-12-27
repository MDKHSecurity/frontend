import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../../../lib/components/refresh/refresh.js";
import { redirect } from "@sveltejs/kit";
import { logErrorToFile } from "$lib/components/logErrorToFile/logErrorToFile.js";

export const load = async ({ data, fetch }) => {
  const { jwt, refreshToken } = data;

  try {
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
      } else if (userResponse.role_name !== "owner") {
        throw redirect(302, "/");
      }

      const institutionRequest = await fetch(`${PUBLIC_BASE_URL}api/institutions`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      const rolesRequest = await fetch(`${PUBLIC_BASE_URL}api/roles`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      const rolesResponse = await rolesRequest.json();
      const institutionResponse = await institutionRequest.json();

      return {
        userResponse,
        rolesResponse,
        institutionResponse,
        newAccessToken,
      };
    } else {
      throw redirect(302, "/login");
    }
  } catch (error) {
    logErrorToFile(error, jwt);
    throw redirect(302, "/login");
  }
};
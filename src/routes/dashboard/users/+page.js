import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../../../lib/components/refresh/refresh.js";
import { redirect } from "@sveltejs/kit";
import { logErrorToFile } from "$lib/components/logErrorToFile/logErrorToFile.js";

export const load = async ({ data, fetch }) => {
  const { accessToken, refreshToken } = data;

  const refreshedData = await refreshTokens(accessToken, refreshToken, fetch);

  try {
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
      } else if (userResponse.role_name !== "admin") {
        throw redirect(302, "/");
      }

      const roomsRequest = await fetch(
        `${PUBLIC_BASE_URL}api/rooms/${userResponse.institution_id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          },
        }
      );

      const usersRequest = await fetch(
        `${PUBLIC_BASE_URL}api/users/${userResponse.institution_id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          },
        }
      );

      const roomsResponse = await roomsRequest.json();
      const usersResponse = await usersRequest.json();

      return {
        userResponse,
        roomsResponse,
        usersResponse,
        newAccessToken,
      };
    } else {
      throw redirect(302, "/login");
    }
  } catch (error) {
    logErrorToFile(error, accessToken);
    throw redirect(302, "/login");
  }
};

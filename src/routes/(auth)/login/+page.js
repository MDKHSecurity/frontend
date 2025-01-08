import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../../../lib/components/refresh/refresh.js";
import { redirect } from "@sveltejs/kit";
export const load = async ({ data, fetch }) => {
  const { accessToken, refreshToken } = data;
    const refreshedData = await refreshTokens(accessToken, refreshToken, fetch);
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
      if (userResponse.role_name) {
        throw redirect(302, "/");
      }
    }else{
    }
  return {
  };
};

import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../../../lib/components/refresh/refresh.js";
import { redirect } from "@sveltejs/kit";
export const load = async ({ data, fetch }) => {
  const { jwt, refreshToken } = data;

  const refreshedData = await refreshTokens(jwt, refreshToken, fetch);

  //const refreshedJwt = refreshedData ? refreshedData.newAccessToken : null;

  const userRequest = await fetch(`${PUBLIC_BASE_URL}api/users`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const userResponse = await userRequest.json();


  if (userResponse.role_name !== "owner") {
    throw redirect(302, "/");
  }

  const institutionRequest = await fetch(
    `${PUBLIC_BASE_URL}api/institutions`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const rolesRequest = await fetch(`${PUBLIC_BASE_URL}api/roles`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const rolesResponse = await rolesRequest.json();
  const institutionResponse = await institutionRequest.json();
  return {
    userResponse,
    rolesResponse,
    institutionResponse,
    jwt

  };
};

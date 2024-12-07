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

  if (userResponse.role_name !== "admin") {
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
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const coursesRequest = await fetch(
    `${PUBLIC_BASE_URL}api/courses`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const roomsResponse = await roomsRequest.json();
  const coursesResponse = await coursesRequest.json();
  
  return {
    userResponse,
    roomsResponse,
    coursesResponse,
    jwt
  };
};
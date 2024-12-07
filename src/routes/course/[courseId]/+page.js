import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../../../lib/components/refresh/refresh.js";
export const load = async ({ data, fetch }) => {
  const { jwt, refreshToken, courseId, roomId} = data;

  const refreshedData = await refreshTokens(jwt, refreshToken, fetch);
  
  //const refreshedJwt = refreshedData ? refreshedData.newAccessToken : null;
  
  const userRequest = await fetch(`${PUBLIC_BASE_URL}api/users`, 
  {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const coursesRequest = await fetch(`${PUBLIC_BASE_URL}api/courses/${courseId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const coursesResponse = await coursesRequest.json();
  const userResponse = await userRequest.json();
  return {
    userResponse,
    coursesResponse,
    roomId,
    jwt
  };
};
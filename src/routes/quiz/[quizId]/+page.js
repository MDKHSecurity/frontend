import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../../../lib/components/refresh/refresh.js";
export const load = async ({ data, fetch }) => {
  const { jwt, refreshToken, quizId } = data;

  const refreshedData = await refreshTokens(jwt, refreshToken);
  
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

  const quizRequest = await fetch(`${PUBLIC_BASE_URL}api/quizzes/${quizId}`, {
    method: "GET",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
    },
  });

  const quizResponse = await quizRequest.json();
  const userResponse = await userRequest.json();
  return {
    userResponse,
    quizResponse
  };
};
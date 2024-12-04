import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../lib/components/refresh/refresh.js";
export const load = async ({ data, fetch }) => {
  const { jwt, refreshToken } = data;

  const refreshedData = await refreshTokens(jwt, refreshToken);
  
  const refreshedJwt = refreshedData ? refreshedData.newAccessToken : null;

  const userRequest = await fetch(`${PUBLIC_BASE_URL}api/users/rooms`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${refreshedJwt}`,
    },
  });

  const quizRequest = await fetch(`${PUBLIC_BASE_URL}api/quizzes`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${refreshedJwt}`,
    },
  });
  
  const userResponse = await userRequest.json();
  const quizResponse = await quizRequest.json();
  return {
    userResponse,
    quizResponse
  };
};
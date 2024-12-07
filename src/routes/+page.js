import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../lib/components/refresh/refresh.js";

export const load = async ({ data, fetch }) => {
  const { jwt, refreshToken } = data;

  try {
    // Use the passed `fetch` function in refreshTokens
    const refreshedData = await refreshTokens(jwt, refreshToken, fetch);
    //const refreshedJwt = refreshedData ? refreshedData.newAccessToken : null;
  } catch (error) {
    console.log(error);
  }

  // Fetch user and quiz data
  const userRequest = await fetch(`${PUBLIC_BASE_URL}api/users/rooms`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const quizRequest = await fetch(`${PUBLIC_BASE_URL}api/quizzes`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const userResponse = await userRequest.json();
  const quizResponse = await quizRequest.json();

  return {
    userResponse,
    quizResponse,
    jwt,
  };
};

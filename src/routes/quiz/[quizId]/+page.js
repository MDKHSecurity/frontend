import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../../../lib/components/refresh/refresh.js";
import errorHandling from "$lib/components/errorHandling/errorHandling.js";
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


  const userResponse = await errorHandling(userRequest);
  const quizResponse = await errorHandling(quizRequest);
  return {
    userResponse,
    quizResponse
  };
};
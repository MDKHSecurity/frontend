import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../lib/components/refresh/refresh.js";
import { redirect } from "@sveltejs/kit";
export const load = async ({ data, fetch, url }) => {
  const { jwt, refreshToken } = data;

  const refreshedData = await refreshTokens(jwt, refreshToken, fetch);
  if(refreshedData !== null){
  
  const newAccessToken = refreshedData.newAccessToken;

  const userRequest = await fetch(`${PUBLIC_BASE_URL}api/users/rooms`, {
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
    console.log(userResponse, "<------- after first request")
    throw redirect(302, "/login");
  }

  const quizRequest = await fetch(`${PUBLIC_BASE_URL}api/quizzes`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${newAccessToken}`,
    },
  });

  const quizResponse = await quizRequest.json();

  return {
    userResponse,
    quizResponse,
    newAccessToken
  };
  }else{
    throw redirect(302, "/login");
  }
};

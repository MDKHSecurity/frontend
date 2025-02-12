import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../lib/components/refresh/refresh.js";
import { redirect } from "@sveltejs/kit";
import { logErrorToFile } from "$lib/components/logErrorToFile/logErrorToFile.js";

export const load = async ({ data, fetch, url }) => {
  const { accessToken, refreshToken } = data;

  const refreshedData = await refreshTokens(accessToken, refreshToken, fetch);
  try{
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
  }catch (error) {
    logErrorToFile(error, accessToken);
    throw redirect(302, "/login");
  }
};

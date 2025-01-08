import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../../../lib/components/refresh/refresh.js";
import { redirect } from "@sveltejs/kit";
import { logErrorToFile } from "$lib/components/logErrorToFile/logErrorToFile.js";

export const load = async ({ data, fetch }) => {
  const { accessToken, refreshToken } = data;

  try {
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

      if (!userResponse.role_name) {
        throw redirect(302, "/login");
      } else if (userResponse.role_name !== "owner") {
        throw redirect(302, "/");
      }

      const videosRequest = await fetch(`${PUBLIC_BASE_URL}api/videos`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      const quizzesRequest = await fetch(`${PUBLIC_BASE_URL}api/quizzes`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      const coursesRequest = await fetch(`${PUBLIC_BASE_URL}api/courses`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      const questionsRequest = await fetch(`${PUBLIC_BASE_URL}api/questions`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      const videosResponse = await videosRequest.json();
      const quizzesResponse = await quizzesRequest.json();
      const coursesResponse = await coursesRequest.json();
      const questionsResponse = await questionsRequest.json();

      return {
        userResponse,
        videosResponse,
        quizzesResponse,
        coursesResponse,
        questionsResponse,
        newAccessToken,
      };
    } else {
      throw redirect(302, "/login");
    }
  } catch (error) {
    logErrorToFile(error, accessToken);
    throw redirect(302, "/login");
  }
};
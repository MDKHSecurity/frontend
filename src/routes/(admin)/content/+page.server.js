import { redirect } from "@sveltejs/kit";
import { PUBLIC_BASE_URL } from "$env/static/public";


export const load = async ({ parent }) => {
    const { userData, jwt } = await parent();

    const videosResponse = await fetch(`${PUBLIC_BASE_URL}api/videos`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`
        },
      });
      const quizzesResponse = await fetch(`${PUBLIC_BASE_URL}api/quizzes`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`
        },
      });
      const coursesResponse = await fetch(`${PUBLIC_BASE_URL}api/courses`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`
        },
      });

      const questionsResponse = await fetch(`${PUBLIC_BASE_URL}api/questions`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`
        },
      });

    if (userData.role_name !== "owner") {
        throw redirect(302, "/");
    }

    const videosData = await videosResponse.json();
    const quizzesData = await quizzesResponse.json();
    const coursesData = await coursesResponse.json();
    const questionsData = await questionsResponse.json();
    
   

    
    return {
        userData,
        videosData,
        quizzesData,
        coursesData,
        questionsData
    };
};
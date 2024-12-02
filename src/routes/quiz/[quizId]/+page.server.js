import { PUBLIC_BASE_URL } from "$env/static/public";

export const load = async ({ parent, params }) => {
  const { jwt } = await parent();
  const { quizId } = params;

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
  return {
      quizResponse
  };
};
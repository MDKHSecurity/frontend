import { PUBLIC_BASE_URL } from "$env/static/public";

export const load = async ({ parent }) => {
  const { jwt } = await parent();

  const userRequest = await fetch(`${PUBLIC_BASE_URL}api/user`, {
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
      quizResponse
  };
};
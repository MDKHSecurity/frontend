import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, params }) => {
  const jwt = cookies.get("jwt");
  const refreshToken = cookies.get("refreshToken");
  const { quizId } = params;

  return { jwt, refreshToken, quizId };
};

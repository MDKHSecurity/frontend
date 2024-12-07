import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, url, params }) => {
  const jwt = cookies.get("jwt");
  const refreshToken = cookies.get("refreshToken");
  const { courseId } = params;
  const roomId = url.searchParams.get("roomId")
  
  return { jwt, refreshToken, courseId, roomId };
};

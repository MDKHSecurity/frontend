import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, url, params }) => {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  const { courseId } = params;
  const roomId = url.searchParams.get("roomId")
  
  return { accessToken, refreshToken, courseId, roomId };
};

import { PUBLIC_BASE_URL } from "$env/static/public";
import refreshTokens from "../../../lib/components/refresh/refresh.js";
import { redirect } from "@sveltejs/kit";
export const load = async ({ data, fetch }) => {
  const { jwt, refreshToken, courseId, roomId } = data;

  const refreshedData = await refreshTokens(jwt, refreshToken, fetch);
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
    }

    const coursesRequest = await fetch(
      `${PUBLIC_BASE_URL}api/courses/${courseId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
      }
    );

    const coursesResponse = await coursesRequest.json();
    return {
      userResponse,
      coursesResponse,
      roomId,
      newAccessToken,
    };
  } else {
    throw redirect(302, "/login");
  }
};

import { PUBLIC_BASE_URL } from "$env/static/public";

export async function load({ parent, params, fetch, url }) {
  const { userData } = await parent();
  const { courseId } = params;

  const roomId = url.searchParams.get("roomId")
  const jwt = userData.jwt;
  const coursesRequest = await fetch(
    `${PUBLIC_BASE_URL}api/courses/${courseId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const coursesResponse = await coursesRequest.json();

  return {
    roomId,
    courseId,
    coursesResponse
  };
}
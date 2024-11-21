import { PUBLIC_BASE_URL } from "$env/static/public";

export const load = async ({ parent, cookies, fetch }) => {
  const { userData } = await parent();
  const jwt = cookies.get("jwt");

  const roomsRequest = await fetch(`${PUBLIC_BASE_URL}api/rooms/${userData.institution_id}`, {
    method: "GET",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
    },
});

const roomsResponse = await roomsRequest.json();

    return {
        jwt,
        roomsResponse
    };
  };
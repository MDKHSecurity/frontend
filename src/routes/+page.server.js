import { PUBLIC_BASE_URL } from "$env/static/public";
let userData;
export const load = async ({ fetch, cookies }) => {
    const jwt = cookies.get("jwt");

    const userResponse = await fetch(`${PUBLIC_BASE_URL}api/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        userData = data;
      });
      
    const getRequest = await fetch(`${PUBLIC_BASE_URL}api/video`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    const responseData = await getRequest.json();
    
    return {
        responseData,
    };
  };
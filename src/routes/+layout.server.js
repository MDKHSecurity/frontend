import { redirect } from "@sveltejs/kit";
import { PUBLIC_BASE_URL } from "$env/static/public";

export const load = async ({ fetch, cookies, url }) => {
    const jwt = cookies.get("jwt");

    const userResponse = await fetch(`${PUBLIC_BASE_URL}api/users`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    });

    const userData = await userResponse.json();

    if (userData.message === "Forbidden" && url.pathname !== "/login") {
        throw redirect(302, "/login");
    }
    return {
        jwt,
        userData
    };
};

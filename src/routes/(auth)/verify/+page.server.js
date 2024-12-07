import { redirect } from "@sveltejs/kit";
import { PUBLIC_BASE_URL } from "$env/static/public";

export const load = async ({ url, cookies }) => {
    const token = url.searchParams.get('token');
    const jwt = cookies.get("jwt");

    // If no token is present in the URL, redirect to an error or homepage
    if (!token || jwt) {
        throw redirect(302, '/');
    }

    // if (url.pathname.startsWith("/verify")) {
    //     return {
    //       jwt: null,
    //       userData: null,
    //     };
    //   }

    // Fetch token data from the API
    const tokenResponse = await fetch(`${PUBLIC_BASE_URL}api/tokens/${token}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    const tokensData = await tokenResponse.json();

    if (tokenResponse.status === 400) {
      throw redirect(302, '/login');
    } else {
      return {
        tokensData,
        token
    };
    }
};

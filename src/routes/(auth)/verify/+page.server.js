import { redirect } from "@sveltejs/kit";
import { PUBLIC_BASE_URL } from "$env/static/public";

export const load = async ({ parent, url }) => {
    const token = url.searchParams.get('token');

    // If no token is present in the URL, redirect to an error or homepage
    if (!token) {
        throw redirect(302, '/');
    }

    // Retrieve parent data
    const { userData, jwt } = await parent();

    // Fetch token data from the API
    const tokenResponse = await fetch(`${PUBLIC_BASE_URL}api/tokens/${token}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${jwt}`,
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

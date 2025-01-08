import { PUBLIC_BASE_URL } from "$env/static/public";

export const logErrorToFile = async (error, jwt, url = undefined) => {
    if (typeof window !== "undefined") {
        url = url || window.location.href;
    }
    console.log("Why am i here?")

    const errorMessage = `${error.name}: ${error.stack}`;
    try {
        const response = await fetch(`${PUBLIC_BASE_URL}api/logs`, {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                errorMessage,
                url,
            }),
        });
    } catch {
    }
};

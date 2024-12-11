import { PUBLIC_BASE_URL } from "$env/static/public";

export const logErrorToFile = async (error, jwt, url = window.location.href) => {
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

        if (!response.ok) {
            console.error(`Failed to log error: ${response.statusText}`);
        }
    } catch (err) {
        console.error('Error while sending log to the server:', err);
    }
};

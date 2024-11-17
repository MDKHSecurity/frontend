<script>
    import { PUBLIC_BASE_URL } from "$env/static/public";

    const getRequest = async (action) => {
        try {
            const response = await fetch(`${PUBLIC_BASE_URL}api/${action}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
</script>
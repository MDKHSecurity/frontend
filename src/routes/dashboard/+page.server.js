import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
    const { userData } = await parent();
    
    if (userData.role_name !== "teacher") {
        throw redirect(302, "/");
    }

    return {
        userData
    };
};
import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
    const { userData } = await parent();
    
    if (userData.role_name !== "admin") {
        throw redirect(302, "/login");
    }

    return {
        userData
    };
};
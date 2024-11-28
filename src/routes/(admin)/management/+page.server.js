import { PUBLIC_BASE_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";

export const load = async ({ parent, fetch, cookies }) => {
    const { userData, jwt } = await parent();
    
    if (userData.role_name !== "owner") {
        throw redirect(302, "/");
    }

     const institutionResponse = await fetch(`${PUBLIC_BASE_URL}api/institutions`, {
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`
        },
  });  
 
  const rolesResponse = await fetch(`${PUBLIC_BASE_URL}api/roles`, {
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${jwt}`
    },
});  

//   const usersResponse = await fetch(`${PUBLIC_BASE_URL}api/users`, {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//        Authorization: `Bearer ${jwt}`
//     },
//   });

  const rolesData = await rolesResponse.json();
  const institutionData = await institutionResponse.json();
    
//   const users = await usersResponse.json();

  return {
    institutionData,
    rolesData

  };
};
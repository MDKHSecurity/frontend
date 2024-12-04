import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, url }) => {
  const jwt = cookies.get("jwt");
  const refreshToken = cookies.get("refreshToken");
  console.log(jwt)
  if (url.pathname.startsWith("/verify")) {
    return {
      jwt: null,
      userData: null,
    };
  } else if (jwt === undefined && url.pathname !== "/login" || refreshToken === undefined && url.pathname !== "/login") {
    throw redirect(302, "/login");
  } else if (jwt && refreshToken && url.pathname === "/login") {
    throw redirect(302, "/");
  }
  return { jwt, refreshToken };
};

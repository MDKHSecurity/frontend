export const load = async ({ cookies, url }) => {
  const jwt = cookies.get("jwt");
  const refreshToken = cookies.get("refreshToken");
  return { jwt, refreshToken };
};

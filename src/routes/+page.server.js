export const load = async ({ cookies }) => {
  const jwt = cookies.get("jwt");
  const refreshToken = cookies.get("refreshToken");
  
  return { jwt, refreshToken };
};
export const load = async ({ cookies }) => {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  
  return { accessToken, refreshToken };
};
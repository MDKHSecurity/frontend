import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, params }) => {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  const institutionId  = params.institution;

  return { accessToken, refreshToken, institutionId };
};

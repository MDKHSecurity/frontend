import { PUBLIC_BASE_URL } from "$env/static/public";

export const load = async ({ fetch }) => {
  console.log('Intercepting /test page load for logout');

  // Make the logout API call when visiting /test
  const response = await fetch(`${PUBLIC_BASE_URL}api/auth/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    console.error('Failed to clear cookies on /test:', response.statusText);
  } else {
    console.log('Cookies cleared successfully');
  }

  return {};
};
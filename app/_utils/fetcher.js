import { auth } from "@/firebase";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchOptions = async (cookies) => {
  const token = await auth.currentUser.getIdToken();
  return {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: cookies,
    },
  };
};

export const fetcher = async (url, token, cookies, options = {}) => {
  return await fetch(`${baseURL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: cookies,
    },
  });
};

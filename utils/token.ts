import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    cookies.set("userToken", token, { path: "/" });
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return cookies.get("userToken");
  }
  return null;
};

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    cookies.remove("userToken", { path: "/" });
  }
};

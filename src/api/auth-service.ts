import Cookies from "js-cookie";

export const AuthService = {
  getAccessToken: () => Cookies.get("accessToken"),
  getRefreshToken: () => Cookies.get("refreshToken"),
  saveTokens: (accessToken: string, refreshToken: string) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
  },
  clearTokens: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  },
};

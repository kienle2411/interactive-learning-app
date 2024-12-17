import axios from "axios";
import Cookies from "js-cookie";
import { AuthService } from "./auth-service";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

const axiosRefreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

const getAccessTokenFromCookies = () => Cookies.get("accessToken");

let isRefreshing = false;
let refreshSubscribers: ((newToken: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (newToken: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessTokenFromCookies();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const origionalRequest = error.config;
    console.log(origionalRequest);
    if (error.response?.status === 401 && !origionalRequest._retry) {
      origionalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            origionalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosClient(origionalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = AuthService.getRefreshToken();

        if (!refreshToken) throw new Error("No refresh token available");

        const { data } = await axiosRefreshClient.get("/auth/refresh", {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const { accessToken: access, refreshToken: refresh } = data.data;

        AuthService.saveTokens(access, refresh);

        onRefreshed(access);

        origionalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosClient(origionalRequest);
      } catch (refreshError) {
        AuthService.clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

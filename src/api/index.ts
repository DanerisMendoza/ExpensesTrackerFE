import getRefreshTokenFromCookie from "@src/utils/Auth";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessTokenFlash");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response interceptor to handle token expiration (401) and refresh the access token
axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  async (error) => {
    const originalRequest = error.config;

    // If the error is a 401 (Unauthorized) and the request hasn't been retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshTokenFromCookie();
        if (refreshToken) {
          // Request a new access token using the refresh token
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
            { refreshToken }
          );

          // Save the new access token
          const newAccessToken = response.data.accessToken;
          sessionStorage.setItem("accessTokenFlash", newAccessToken);

          // Set the new access token in the original request's header
          originalRequest.headers["Authorization"] = newAccessToken;

          // Retry the original request with the new access token
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error("Failed to refresh token", err);
      }
    }

    // If we couldn't refresh the token, reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;

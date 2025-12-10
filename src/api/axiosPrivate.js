import axios from "axios";
import { getAuth } from "firebase/auth";

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach Firebase ID Token to every request
axiosPrivate.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const fbUser = auth.currentUser;

    if (fbUser) {
      const token = await fbUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

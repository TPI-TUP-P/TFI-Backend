import api from "./api";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.token) {
      localStorage.setItem("token", response.token);
    }
    return response;
  },

  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    if (response.token) {
      localStorage.setItem("token", response.token);
    }
    return response;
  },
  reactivateAccount: async (token) => {
    try {
      const response = await api.post("/auth/reactivate", {token});
      return response;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        "Error al intentar reactivar la cuenta."
      );
    }
  },

  getProfile: async () => {
    return await api.get("/auth/me");
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  forgotPassword: async (email) => {
    return await api.post("/auth/forgot-password", { email });
  },

  resetPassword: async (token, newPassword) => {
    return await api.post("/auth/reset-password", { token, newPassword });
  },
};

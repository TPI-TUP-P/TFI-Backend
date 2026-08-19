import api from "./api";

export const userService = {
  getById: async (id) => {
    try {
      const response = await api.get(`User/${id}`);
      return response;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  getAll: async (role = "", includeDeleted = false) => {
    return await api.get("user", {
      params: {
        userRole: role ? role : undefined,
        includeDeleted: includeDeleted,
      },
    });
  },

  getMyCvUrl: async () => {
    try {
      const response = await api.get("User/me/cv");
      return response.url;
    } catch (error) {
      console.error("Error fetching CV url:", error);
      throw error;
    }
  },
};

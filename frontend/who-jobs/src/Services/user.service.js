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
};
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

  delete: async (id) => {
    try {
      const response = await api.delete(`User/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async (data) => {
    try {
      const response = await api.patch(`User`, data);
      return response;
    } catch (error) {
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


  
  
  uploadCv: async (formData) => {
    try {
      const response = await api.post('/User/cv', formData);
      return response;
    } catch (error) {
      console.error("Error uploading CV:", error);
      throw error;
    }
  },

  getMyCvUrl: async () => {
    try {
      const response = await api.get("User/me/cv",{
        skipGlobalLoader: true,
      });
      return response;
    } catch (error) {
      console.error("Error fetching CV url:", error);
      throw error;
    }
  },
};

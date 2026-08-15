import api from "./api";

export const postulationService = {
  apply: async (jobOfferId, cvFile) => {
    const formData = new FormData();
    formData.append("JobOfferId", jobOfferId);
    formData.append("CV", cvFile);

    try {
      const response = await api.post("Postulation", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      console.error("Error applying to job:", error);
      throw error;
    }
  },

  getByJobOffer: async (jobOfferId, page = 1, pageSize = 5) => {
    try {
      const response = await api.get(
        `Postulation/${jobOfferId}/postulations?page=${page}&pageSize=${pageSize}`
      );
      return response; // { items, totalItems, totalPages, currentPage, pageSize }
    } catch (error) {
      console.error("Error fetching postulations:", error);
      throw error;
    }
  },

  getByUser: async (userId) => {
    try {
      const response = await api.get(`Postulation/user/${userId}`);
      return response;
    } catch (error) {
      console.error("Error fetching user postulations:", error);
      throw error;
    }
  },

  updateState: async (id, state) => {
    try {
      const response = await api.patch(`Postulation/${id}`, { state });
      return response;
    } catch (error) {
      console.error("Error updating postulation state:", error);
      throw error;
    }
  },

  getCvUrl: async (postulationId) => {
    try {
      const response = await api.get(`Postulation/${postulationId}/cv`);
      return response.url;
    } catch (error) {
      console.error("Error fetching CV url:", error);
      throw error;
    }
  },
};
import api from "./api";

export const jobService = {
  getJobs: async (page = 1) => {
    try {
      const response = await api.get(`Publication?page=${page}`);
      return response;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  },


  getById: async (id) => {
    try {
      const response = await api.get(`Publication/${id}`);
      return response;
    } catch (error) {
      console.error("Error fetching job:", error);
      throw error;
    }
  },
  

create: async (data) => {
    try {
      const response = await api.post("Publication", data);
      return response;
    } catch (error) {
      console.error("Error creating publication:", error);
      throw error;
    }
  },

  update: async (data) => {
    // data debe incluir: { id, job_position, description, salary }
    try {
      const response = await api.patch("Publication", data);
      return response;
    } catch (error) {
      console.error("Error updating publication:", error);
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const response = await api.delete(`Publication/${id}`);
      return response;
    } catch (error) {
      console.error("Error deleting publication:", error);
      throw error;
    }
  },


};


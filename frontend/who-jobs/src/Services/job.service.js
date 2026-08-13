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
};


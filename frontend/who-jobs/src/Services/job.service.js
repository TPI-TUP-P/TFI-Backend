import api from "./api";

export const jobService = {

  // getJobsBySearch: async (searchValue)=> {
  //   try {
  //       const response = await api.get("Publication")
  //       return response;
  //   } catch (error) {
  //     console.error("Error fetching jobs:", error);
  //     throw error
  //   }
  // },

  getJobs: async (page = 1, searchValue = "") => {
    try {
      const response = await api.get(`Publication?page=${page}&search=${searchValue}`);
      return response;
    } catch (error) {
      console.error("Error fetching jobs:", error);
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


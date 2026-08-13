import api from "./api";

export const postulationService = {
  apply: async (jobOfferId, cvFile) => {
    const formData = new FormData();
    formData.append("JobOfferId", jobOfferId);
    formData.append("CV", cvFile);

    try {
      const response = await api.post("Postulation", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response; // o response.data, según lo que devuelva tu interceptor (ver conversación anterior)
    } catch (error) {
      console.error("Error applying to job:", error);
      throw error;
    }
  },
};
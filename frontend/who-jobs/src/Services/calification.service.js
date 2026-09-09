import api from "./api";

export const calificationService = {
  getMine: async (idQualified) => {
  try {
    const response = await api.get(`Calification/mine/${idQualified}`);
    return response; // ya viene null o el objeto, directo del backend
  } catch (error) {
    console.error("Error fetching calification:", error);
    throw error;
  }
},

  getAverage: async (userId) => {
    try {
      const response = await api.get(`Calification/average/${userId}`);
      return response; // { userId, average, count }
    } catch (error) {
      console.error("Error fetching average calification:", error);
      throw error;
    }
  },

  create: async (idQualified, score) => {
    try {
      const response = await api.post("Calification", { idQualified, score });
      return response;
    } catch (error) {
      console.error("Error creating calification:", error);
      throw error;
    }
  },

  update: async (id, idQualifier, idQualified, score) => {
    try {
      const response = await api.patch("Calification", { id, idQualifier, idQualified, score });
      return response;
    } catch (error) {
      console.error("Error updating calification:", error);
      throw error;
    }
  },
};
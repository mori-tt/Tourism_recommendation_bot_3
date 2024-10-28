import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const touristApi = {
  getTouristInfo: async (areaName: string) => {
    const response = await api.post("/tourist-info", {
      area_name: areaName,
    });
    return response.data;
  },
};

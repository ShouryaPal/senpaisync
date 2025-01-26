import { api } from "@/lib/server";

export const fetchQuickLinks = async () => {
  const { data } = await api.get("/quick-links");
  return data.quickLinks;
};

export const createQuickLink = async (data: { name: string; url: string }) => {
  const response = await api.post("/quick-links", data);
  return response.data;
};

export const updateQuickLink = async (
  id: string,
  data: { name: string; url: string },
) => {
  const response = await api.put(`/quick-links/${id}`, data);
  return response.data;
};

export const deleteQuickLink = async (id: string) => {
  const response = await api.delete(`/quick-links/${id}`);
  return response.data;
};

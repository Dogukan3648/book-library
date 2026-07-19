import api from "./api";

export async function searchBooks(query) {
  const response = await api.get(`/search.json?q=${query}`);

  return response.data;
}

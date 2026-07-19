import api from "./api";

export async function searchBooks(query) {
  const response = await api.get("/search.json", {
    params: {
      q: query,
    },
  });

  const docs = response.data.docs ?? [];

  return docs.map((doc) => ({
    key: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? "Unknown author",
    cover: doc.cover_i ?? null,
    publishedYear: doc.first_publish_year ?? "Unknown year",
  }));
}

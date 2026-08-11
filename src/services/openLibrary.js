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

export async function getBookById(bookId) {
  const workId = bookId.replace("/works/", "");

  const response = await api.get(`/works/${workId}.json`);
  const data = response.data;

  let author = "Unknown author";

  const authorKey = data.authors?.[0]?.author?.key;

  if (authorKey) {
    try {
      const authorResponse = await api.get(`${authorKey}.json`);
      author = authorResponse.data.name ?? "Unknown author";
    } catch (error) {
      console.error("Author could not be loaded:", error);
    }
  }

  const publishedYear =
    String(data.first_publish_date ?? "").match(/\b\d{4}\b/)?.[0] ??
    "Unknown year";

  return {
    key: data.key ?? `/works/${workId}`,
    title: data.title ?? "Unknown title",
    author,
    cover: data.covers?.[0] ?? null,
    publishedYear,
  };
}

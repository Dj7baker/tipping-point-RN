import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://dp-api.cyclic.app",
});

export const getArticles = (topic, sort_by, order) => {
  return newsApi
    .get("/api/articles", { params: { topic, sort_by, order } })
    .then((res) => {
      return res.data.articles;
    });
};

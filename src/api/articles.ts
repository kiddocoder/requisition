import { API } from "../config/axios";

export const getArticles = async () => {
  const { data } = await API.get("articles");
  return data;
};

export const addArticle = async (datla:any) => {
  const { data } = await API.post("articles",datla);
  return data;
};

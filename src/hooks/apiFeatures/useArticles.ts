import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticles, addArticle } from "../../api/articles";

export const useFetchArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
};

export const useAddArticle = (data: any) => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["articles"],
    mutationFn: () => addArticle(data),
    onSuccess: () => {
      query.invalidateQueries({queryKey:['articles']})
    },
  });
};

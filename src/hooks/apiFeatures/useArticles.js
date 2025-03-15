import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
};

export const addArticle = (data) => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["articles"],
    mutationFn: () => addArticle(data),
    onSuccess: () => {
      query.invalidateQueries(["articles"]);
    },
  });
};

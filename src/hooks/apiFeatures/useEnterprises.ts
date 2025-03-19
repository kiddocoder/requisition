import {  useQuery } from "@tanstack/react-query";
import { getEnterprises } from "../../api/enterprises";

export const useFetchEnterprises = () => {
  return useQuery({
    queryKey: ["enterprises"],
    queryFn: getEnterprises,
  });
};

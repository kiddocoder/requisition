import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequisitions ,addRequisition} from "../../api/requisitions";

export const useFetchRequisitions = () =>{
    return useQuery({
      queryKey: ["requisitions"],
      queryFn: getRequisitions,
    });
  };

export const useAddRequisition = () =>{
    const query = useQueryClient();
    const {mutateAsync} = useMutation({
        mutationKey:["requisitions"],
        mutationFn:addRequisition,
        onSuccess:() =>{
            query.invalidateQueries(["requisitions"])
        },
    })
    return {mutateAsync}
}

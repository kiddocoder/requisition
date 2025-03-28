
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSuppliers,AddSupplier } from "../../api/suppliers";


export const useGetSuppliers = () =>{
    return useQuery({
        queryKey:['suppliers'],
        queryFn:getSuppliers,

    })
}

export const useAddSupplier = () =>{
    const query = useQueryClient();
    const {mutateAsync} = useMutation({
        mutationKey:["suppliers"],
        mutationFn:AddSupplier,
        onSuccess:() =>{
            query.invalidateQueries({queryKey:["suppliers"]})
        }
    })
    

    return {mutateAsync}
}
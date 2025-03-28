
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddProcurement } from '../../api/procurement';
export const useAddProcurement = () => { 
    const query = useQueryClient();
    const {mutateAsync} = useMutation({
        mutationKey: ['procurement'],
        mutationFn: AddProcurement,
        onSuccess: () => {
            query.invalidateQueries({queryKey: ['procurement']})
        }
    });
    return {mutateAsync};
}
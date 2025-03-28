import { API } from "../config/axios";

export const AddProcurement  = async (kl:any) => {
    const {data} = await API.post('procurement',kl);
    return data;
}
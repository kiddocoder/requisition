import { API } from "../config/axios"


export const getSuppliers = async ()=> {
    const {data} = await API.get('suppliers');
    return data;
}

export const AddSupplier= async (kd:any)=> {
    const {data} = await API.post('suppliers',kd);
    return data;
}
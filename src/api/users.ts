import { API } from "../config/axios";

export const signUpUser = async (data:any)=>{
    const  res = await API.post("users", data);
    return res.data;
}

export const loginUser = async (data:any) =>{
    const res = await API.post("users/login", data);
    return res.data;
}
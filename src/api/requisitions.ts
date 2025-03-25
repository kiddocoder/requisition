import { API } from "../config/axios";

export const getRequisitions = async () => {
  const { data } = await API.get("requisitions");
  return data;
};

export const addRequisition = async (kk:any) => {
    const { data } = await API.post("requisitions",kk);
    return data;
  };
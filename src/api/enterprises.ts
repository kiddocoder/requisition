import { API } from "../config/axios";

export const getEnterprises = async () => {
  const { data } = await API.get("enterprises");
  return data;
};

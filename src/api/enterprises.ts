import { API } from "../config/axios";

export const getEnterprises = async () => {
  const { data } = await API.get("api/enterprises");
  return data;
};

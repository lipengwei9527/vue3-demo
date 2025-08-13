import xhr from "@/axios";
const PREFIX = import.meta.env.VITE_API_EGG;
export const getEgg = (params?: object) => {
  return xhr.post(`${PREFIX}/postReq`, params);
};

import xhr from "@/axios";
// const PREFIX = import.meta.env.VITE_API_EGG;
// const PREFIX = "/egg";
export const getEgg = (params?: object) => {
  return xhr.post(`/egg/postReq`, params);
};
export const getExpress = (params?: object) => {
  return xhr.post(`/express/postReq`, params);
};

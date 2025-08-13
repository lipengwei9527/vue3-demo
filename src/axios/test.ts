import xhr from "@/axios";
export const getData = (params?: object) => {
  return xhr.post("/pet", params);
};

export const testData = (params?: object) => {
  return xhr.get("/topapi/user/getbyunionid", { params });
};

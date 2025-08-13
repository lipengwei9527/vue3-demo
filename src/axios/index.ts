import axios from "axios";
const xhr = axios.create({
  timeout: 1000 * 10,
});
xhr.interceptors.request.use(
  (config) => {
    console.log(`output->config`, config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
xhr.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default xhr;

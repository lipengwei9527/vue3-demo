import xhr from "@/axios";
import { fileToFormData, fileToBase64, fileToBinary } from "@/utils/file";
const prefix = import.meta.env.VITE_API_EXPRESS;
// 单文件上传
export const uploadFormData = async (file: File) => {
  const formData = await fileToFormData(file);
  return xhr.post(`${prefix}/file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// base64上传
export const uploadBase64 = async (file: File) => {
  const base64Data = await fileToBase64(file);
  if (base64Data.state != "success") return new Error("文件格式不支持");
  return xhr.post(`${prefix}/file/base64`, {
    ext: base64Data.ext,
    file: base64Data.base64,
  });
};
// base64上传
export const uploadBinary = async (file: File) => {
  const binaryData = await fileToBinary(file);
  if (binaryData.state != "success") return new Error("文件格式不支持");
  return xhr.post(`${prefix}/file/binary`, binaryData.binary, {
    headers: {
      "Content-Type": "application/octet-stream",
      "x-ext": file.name.split(".").pop(),
    },
  });
};

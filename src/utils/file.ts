import sparkMD5 from "spark-md5";
/**
 * @description 文件切片
 * @param file 文件整体数据
 * @returns { ChunkType[] } 切片数据数组
 */
export async function cutFile(file: File) {
  const chunkSize = 1024 * 1024 * 10; // 1024 * 1024 = 1MB
  const chunkCount = Math.ceil(file.size / chunkSize);
  const fileChunks: ChunkType[] = [];
  for (let i = 0; i < chunkCount; i++) {
    const chunk = await createChunk(file, i, chunkSize);
    fileChunks.push(chunk);
  }
  return fileChunks;
}
/**
 *@description 创建文件切片
 * @param file 文件整体数据
 * @param index 第几个切片
 * @param chunkSize 切片尺寸，单位bit
 * @returns { ChunkType } 切片数据
 */
async function createChunk(file: File, index: number, chunkSize: number) {
  return new Promise<ChunkType>((resolve) => {
    const start = index * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const spark = new sparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      let hash = "";
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        spark.append(result);
        hash = spark.end();
      }
      resolve({
        start,
        end,
        index,
        hash,
        blob,
      });
    };
    fileReader.onerror = (e) => {
      console.error("文件切片失败:", e);
    };
    fileReader.readAsArrayBuffer(blob);
  });
}

export async function fileToFormData(file: File, pathName: string = "file") {
  const formData = new FormData();
  formData.append(pathName, file);
  return formData;
}
/**
 * @description 文件转base64
 * @param file
 * @returns
 */
export function fileToBase64(file: File) {
  return new Promise(
    (
      resolve: (value: {
        state: "success" | "fail";
        message?: string;
        ext: string | undefined;
        base64: string;
      }) => void,
      reject: (reason: {
        state: "fail";
        message: ProgressEvent<FileReader>;
      }) => void
    ) => {
      const ext = file.name.split(".").pop();
      const reader = new FileReader();
      reader.onload = (e) => {
        const uint8Array = new Uint8Array(e.target!.result as ArrayBuffer);
        const str = uint8Array.reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        );
        const base64 = btoa(str);
        resolve({
          state: "success",
          ext,
          base64,
        });
      };
      reader.onerror = (e) => {
        reject({
          state: "fail",
          message: e,
        });
      };
      reader.readAsArrayBuffer(file);
    }
  );
}
/**
 * @description 文件转二进制
 * @param file
 * @returns
 */
export function fileToBinary(file: File) {
  return new Promise(
    (
      resolve: (value: { state: "success"; binary: ArrayBuffer }) => void,
      reject: (reason: {
        state: "fail";
        message: ProgressEvent<FileReader>;
      }) => void
    ) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const binary = reader.result as ArrayBuffer;
        resolve({
          state: "success",
          binary,
        });
      };
      reader.onerror = (e) => {
        reject({
          state: "fail",
          message: e,
        });
      };
      reader.readAsArrayBuffer(file);
    }
  );
}
/**
 * @description 下载文件
 * @param file
 * @param fileName
 */
export function downloadFile(file: File, fileName: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = fileName;
  link.click();
}
type ChunkType = {
  start: number; // 起始位置
  end: number; //结束位置，不包含该位置
  index: number; // 切片索引
  hash?: string; // 切片hash值
  blob: Blob; // 切片数据
};

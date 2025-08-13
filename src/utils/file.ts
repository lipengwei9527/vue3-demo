export async function fileToFormData(file: File, pathName: string = "file") {
  const formData = new FormData();
  formData.append(pathName, file);
  return formData;
}
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

export function downloadFile(file: File, fileName: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = fileName;
  link.click();
}

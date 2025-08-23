import { defineStore } from "pinia";
export const useExFormStore = defineStore("exForm", {
  state: () => ({
    formData: {}, //
    compList: [],
  }),
});
export default useExFormStore;

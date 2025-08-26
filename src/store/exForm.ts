import { defineStore } from "pinia";
export const useExFormStore = defineStore("exForm", {
  state: () => ({
    formData: {}, //
    baseCtrls: [],
  }),
});
export default useExFormStore;

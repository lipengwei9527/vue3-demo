import { defineStore } from "pinia";
// import type { ExCreateFormState } from "@/types/store";
export const useExCreateFormStore = defineStore("exCreateForm", {
  state: () => ({
    formData: {}, //
    baseCtrls: [],
  }),
  actions: {},
});
export default useExCreateFormStore;

import { defineStore } from "pinia";
export const useKeepStore = defineStore("keep", {
  state: () => ({
    a: 111,
  }),
  getters: {},
  actions: {},
});
export default useKeepStore;

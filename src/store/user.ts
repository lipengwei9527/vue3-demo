import { defineStore } from "pinia";

export const useUserStore = defineStore("userIns", {
  state: () => ({
    id: 1,
  }),
  getters: {},
  actions: {
    getInfo() {
      console.log(`output->this`, this);
    },
  },
});
export default useUserStore;

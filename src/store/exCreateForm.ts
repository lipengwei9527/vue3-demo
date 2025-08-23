import { defineStore } from "pinia";
import type { BaseCompCtrl, BaseCompCtrls } from "@/types/components";
import type { ExCreateFormState } from "@/types/store";
export const useExCreateFormStore = defineStore("exCreateForm", {
  state: (): ExCreateFormState => ({
    formData: {}, //
    compList: [],
  }),
  actions: {
    updateCtrls(index: number, ctrls: BaseCompCtrl[]) {
      this.compList[index].ctrls = ctrls;
    },
    updateCompList(list: BaseCompCtrls[]) {
      this.compList = list;
    },
  },
});
export default useExCreateFormStore;

import { defineStore } from "pinia";

interface IState {
  showLeftDrawer: boolean;
  showRightDrawer: boolean;
  showMenuBar: boolean;
  showTaskBar: boolean;
}

export const useAppStore = defineStore({
  id: "appStore",
  state: (): IState => ({
    showLeftDrawer: true,
    showRightDrawer: true,
    showMenuBar: true,
    showTaskBar: true,
  }),
});

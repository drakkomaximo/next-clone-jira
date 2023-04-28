import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  isAdding: boolean;
  isDragging: boolean;
  setIsAddingEntry: ({ payload }: { payload: boolean }) => void;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const UiContext = createContext({} as ContextProps);

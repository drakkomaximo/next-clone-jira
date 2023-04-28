import { FC, useReducer } from "react";
import { UiContext, uiReducers } from "./";

export interface UiState {
  sidemenuOpen: boolean;
  isAdding: boolean;
  isDragging: boolean
}

const UI_INITIAL_STATE: UiState = {
  sidemenuOpen: false,
  isAdding: false,
  isDragging: false
};

export const UiProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducers, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };

  const closeSideMenu = () => {
    dispatch({ type: "UI - Close Sidebar" });
  };

  const setIsAddingEntry = ({ payload}:{payload: boolean}) => {
    dispatch({ type: "UI - Set isAddingEntry", payload });
  };

  const startDragging = () => {
    dispatch({ type: "UI - Start Dragging" });
  };

  const endDragging = () => {
    dispatch({ type: "UI - End Dragging" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

import { Entry } from "@/interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | { type: "[Entries] Add-Entry"; payload: Entry }
  | { type: "[Entries] Refresh-Data"; payload: Entry[] }
  | { type: "[Entries] Updated-Entry"; payload: Entry }
  | { type: "[Entries] Delete-Entry"; payload: string };

export const entriesReducers = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entries] Add-Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[Entries] Refresh-Data":
      return {
        ...state,
        entries: action.payload,
      };
    case "[Entries] Updated-Entry":
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry._id === action.payload._id ? action.payload : entry
        ),
      };
    case "[Entries] Delete-Entry":
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
      };

    default:
      return state;
  }
};

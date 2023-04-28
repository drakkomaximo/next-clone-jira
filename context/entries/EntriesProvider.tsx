import { FC, useReducer, useEffect } from "react";
import { EntriesContext, entriesReducers } from "./";
import { Entry } from "@/interfaces";
import { entriesApi } from "@/apis";
import { useSnackbar } from "notistack";

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(entriesReducers, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addEntry = async ({ description }: { description: string }) => {
    try {
      const { data } = await entriesApi.post<Entry>("/entries", {
        description,
      });

      dispatch({ type: "[Entries] Add-Entry", payload: data });
      enqueueSnackbar("Entry Created", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntry = async ({
    entryUpdated,
    showSnackbar = false,
  }: {
    entryUpdated: Entry;
    showSnackbar?: boolean;
  }) => {
    try {
      const { _id, description, status } = entryUpdated;
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entries] Updated-Entry", payload: data });
      showSnackbar &&
        enqueueSnackbar("Entry Updated", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
    } catch (error) {
      console.log(error);
    }
  };

  const refresfEntries = async () => {
    const { data, status } = await entriesApi.get<Entry[]>("/entries");
    if (status === 200) {
      dispatch({ type: "[Entries] Refresh-Data", payload: data });
    }
  };

  useEffect(() => {
    refresfEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{ ...state, addEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};

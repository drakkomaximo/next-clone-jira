import { Entry } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  entries: Entry[];
  addEntry: ({ description }: { description: string }) => void;
  updateEntry: ({ entryUpdated, showSnackbar }: { entryUpdated: Entry; showSnackbar?: boolean }) => void;
  deleteEntry: ({ id }: { id: string }) => void;
}

export const EntriesContext = createContext({} as ContextProps);

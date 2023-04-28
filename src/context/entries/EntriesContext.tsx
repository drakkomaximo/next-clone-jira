import { Entry } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  entries: Entry[];
  addEntry: ({ description }: { description: string }) => void;
  updateEntry: ({ entryUpdated }: { entryUpdated: Entry }) => void;
}

export const EntriesContext = createContext({} as ContextProps);

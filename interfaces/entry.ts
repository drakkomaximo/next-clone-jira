export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatus;
}

export interface TableTitles {
  title: string;
  status: EntryStatus;
}

export type EntryStatus = "pending" | "in-progress" | "finished";

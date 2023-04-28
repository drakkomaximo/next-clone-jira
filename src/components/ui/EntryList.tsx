import { FC, useContext, useMemo, DragEvent } from "react";
import { Paper, List } from "@mui/material";
import { EntryCard } from "./";
import { EntryStatus } from "@/interfaces";
import { EntriesContext } from "@/context/entries";
import { UiContext } from "@/context/ui";
import styles from "./EntryList.module.css";

interface EntryListProps {
  status: EntryStatus;
}

export const EntryList: FC<EntryListProps> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UiContext);
  const entriesBystatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );
  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("entry");
    const entryUpdated = entries.find((entry) => entry._id === id)!;
    entryUpdated.status = status;
    updateEntry({ entryUpdated });
    endDragging()
  };
  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all 0.3" }}>
          {entriesBystatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};

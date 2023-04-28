import { Grid, Card, CardHeader } from "@mui/material";
import { FC } from "react";
import { EntryList } from "./EntryList";
import { NewEntry } from "./NewEntry";
import { EntryStatus } from "@/interfaces";

interface TableCardsProps {
  title: string;
  status: EntryStatus;
}

const TableCards: FC<TableCardsProps> = ({ status, title }) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card sx={{ height: "calc(100vh - 100px)" }}>
        <CardHeader title={title} />
        {status === "pending" && <NewEntry />}
        <EntryList status={status} />
      </Card>
    </Grid>
  );
};

export default TableCards;

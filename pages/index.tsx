import { NextPage } from "next";
import { Layout } from "@/components/layouts";
import { Grid, Card, CardHeader } from "@mui/material";
import { EntryList, NewEntry } from "@/components/ui";
import TableCards from "@/components/ui/TableCards";
import { TableTitles } from "@/interfaces";

const entryStatesTitlesTable: TableTitles[] = [
  {
    title: "Pending",
    status: "pending",
  },
  {
    title: "In progress",
    status: "in-progress",
  },
  {
    title: "Finished",
    status: "finished",
  },
];

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - Clone Jira">
      <Grid container spacing={2}>
        {entryStatesTitlesTable.map((entryState) => (
          <TableCards key={entryState.status} {...entryState} />
        ))}
      </Grid>
    </Layout>
  );
};

export default HomePage;

import { Layout } from "@/components/layouts";
import { FloatButton } from "@/components/ui";
import { EntriesContext } from "@/context/entries";
import { dbEntries } from "@/database";
import { Entry, EntryStatus } from "@/interfaces";
import { dateFunctions } from "@/utils";
import { SaveOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC, useContext, useMemo, useState } from "react";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface EntryPageProps {
  entry: Entry;
}

const EntryPage: FC<EntryPageProps> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext);
  const router = useRouter();
  const [description, setDescription] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const hasError = useMemo(
    () => description.length <= 0 && touched,
    [description, touched]
  );

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const handleStatusValue = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };
  const handleBlur = () => {
    setTouched(true);
  };
  const onSave = () => {
    if (description.trim().length === 0) return;
    const entryUpdated: Entry = {
      ...entry,
      status,
      description,
    };
    updateEntry({ entryUpdated, showSnackbar: true });
    router.push("/");
  };

  return (
    <Layout title={description.substring(0, 20) + "..."}>
      <>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader
                title={`Entrada:`}
                subheader={`Created ago: ${dateFunctions.getFormatDistanceToNow(
                  { date: entry.createdAt }
                )}`}
              />
              <CardContent>
                <TextField
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  placeholder="Nuvea entrada"
                  autoFocus
                  multiline
                  label="Actualizar entrada"
                  value={description}
                  onChange={handleInputValue}
                  onBlur={handleBlur}
                  helperText={hasError && "This field is required"}
                  error={hasError}
                />

                <FormControl>
                  <FormLabel>Status:</FormLabel>
                  <RadioGroup row value={status} onChange={handleStatusValue}>
                    {validStatus.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<SaveOutlined />}
                  variant="contained"
                  fullWidth
                  onClick={onSave}
                  disabled={description.length <= 0}
                >
                  save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <FloatButton id={entry._id} />
      </>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById({ id });

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { entry },
  };
};

export default EntryPage;

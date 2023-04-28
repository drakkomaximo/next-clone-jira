import { FC, useState, ChangeEvent, useContext } from "react";
import { Button, Box, TextField } from "@mui/material";
import { SaveOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";
import { EntriesContext } from "@/context/entries";
import { UiContext } from "@/context/ui";

export const NewEntry: FC = () => {
  const { addEntry } = useContext(EntriesContext);
  const { isAdding, setIsAddingEntry } = useContext(UiContext);

  const [description, setDescription] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const handleBlur = () => {
    setIsTouched(true);
  };
  const resetValues = () => {
    setIsAddingEntry({ payload: false });
    setDescription("");
    setIsTouched(false);
  };
  const onSave = () => {
    if (description.length === 0) return;
    addEntry({ description });
    resetValues();
  };
  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAdding ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="New entry"
            autoFocus
            multiline
            label="New entry"
            helperText={
              description.length === 0 && isTouched && "Enter a value"
            }
            value={description}
            error={description.length === 0 && isTouched}
            onChange={handleInputValue}
            onBlur={handleBlur}
          />
          <Box display="flex" justifyContent="space-between" padding={1}>
            <Button variant="text" onClick={resetValues}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlined />}
              onClick={onSave}
            >
              Add entry
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          startIcon={<AddCircleOutlineOutlined />}
          onClick={() => setIsAddingEntry({ payload: true })}
        >
          Add task
        </Button>
      )}
    </Box>
  );
};

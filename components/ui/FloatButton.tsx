import { EntriesContext } from "@/context/entries";
import { DeleteOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

interface FloatButtonProps {
  id: string;
}

export const FloatButton: FC<FloatButtonProps> = ({ id }) => {
  const router = useRouter()
  const { deleteEntry } = useContext(EntriesContext);
  const hanldeDelete = () =>{
    deleteEntry({ id })
    router.push("/");
  }
  return (
    <IconButton
      sx={{
        position: "fixed",
        bottom: 30,
        right: 30,
        backgroundColor: "error.dark",
      }}
      onClick={hanldeDelete}
    >
      <DeleteOutline />
    </IconButton>
  );
};

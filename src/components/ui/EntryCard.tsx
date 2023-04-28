import { FC, DragEvent, useContext } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { Entry } from "@/interfaces";
import { UiContext } from "@/context/ui";

interface EntryCardProps {
  entry: Entry;
}

export const EntryCard: FC<EntryCardProps> = ({ entry }) => {
  const { createdAt, description, _id } = entry;
  const { startDragging, endDragging } = useContext(UiContext);
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("entry", _id);
    startDragging()
  };
  const onDragEnd = (event: DragEvent) => {
    endDragging()
  };
  return (
    <Card
      sx={{ marginBottom: 1, opacity: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>{description}</Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">{createdAt}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

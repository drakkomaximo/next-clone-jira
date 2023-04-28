import { FC, useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { UiContext } from "@/context/ui";

export const NavBar: FC = () => {
  const { openSideMenu } = useContext(UiContext)
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlined />
        </IconButton>
        <Typography variant="h6">Clone Jira</Typography>
      </Toolbar>
    </AppBar>
  );
};

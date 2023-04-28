import { FC, useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography, Link } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { UiContext } from "@/context/ui";
import NextLink from "next/link";

export const NavBar: FC = () => {
  const { openSideMenu } = useContext(UiContext);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlined />
        </IconButton>
        <NextLink href={"/"} passHref legacyBehavior>
          <Link underline="none" color={"white"}>
            <Typography variant="h6">Clone Jira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};

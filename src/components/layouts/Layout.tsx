import { FC } from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import { NavBar, Sidebar } from "../ui";

type LayoutProps = {
  title?: string;
  children: JSX.Element;
};

export const Layout: FC<LayoutProps> = ({ title = "CloneJira", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title> {title}</title>
      </Head>
      <NavBar />
      <Sidebar />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};

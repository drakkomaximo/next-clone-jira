import React, { useContext } from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { InboxOutlined, MailOutlineOutlined } from "@mui/icons-material";
import { UiContext } from "@/context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UiContext);
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={sidemenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{ width: 250 }}>
        <Box>
          <Typography variant="h4">Menú</Typography>
        </Box>

        <List>
          {menuItems.map((text, index) => (
            <ListItem key={text}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItem key={text}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

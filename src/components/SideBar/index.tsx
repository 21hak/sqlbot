import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Divider, IconButton, List, styled, Toolbar } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { SchemaLinkModel } from "../../lib/models";
import { schemaLinkState } from "../Scheme/atoms";

const drawerWidth: number = 240;

interface SideBarProps {
  schemaLinks: Array<SchemaLinkModel>;
  selected?: number;
  setSelected: (i: number) => void;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  marginTop: 112,
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const SideBar: FC<SideBarProps> = function SideBar({
  schemaLinks,
  setSelected,
  selected,
}) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [schemaLink, setSchemaLink] = useRecoilState(schemaLinkState);

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {schemaLinks.map((s, i) => {
          return (
            <ListItemButton
              key={i}
              selected={s.word === schemaLink.word}
              onClick={() => {
                setSchemaLink(s);
                setSelected(i);
              }}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={s.word} />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};
export default SideBar;

interface NaturalWordsProps {
  words: string[];
}

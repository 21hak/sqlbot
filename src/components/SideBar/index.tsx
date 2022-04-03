import React, { FC, useState } from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {
  Badge,
  Divider,
  IconButton,
  List,
  styled,
  Toolbar,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { SchemaLinkModel } from "../../lib/models";

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
        {schemaLinks.map((word, i) => {
          return (
            <ListItemButton
              key={i}
              // selected={word.word === selected?.word}
              selected={i === selected}
              onClick={() => {
                // setSelected(word);
                setSelected(i);
              }}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={word.word} />
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

const NaturalWords: FC<NaturalWordsProps> = function NaturalWords({ words }) {
  return (
    <React.Fragment>
      {words.map((word) => {
        return (
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={word} />
          </ListItemButton>
        );
      })}
    </React.Fragment>
  );
};

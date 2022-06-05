import DashboardIcon from "@mui/icons-material/Dashboard";
import { Divider, List, styled } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { useSchemaLinksTemp } from "../../apis/hooks";
import {
  databaseState,
  naturalLanguageState,
  schemaLinkState,
} from "../../atoms";

const drawerWidth: number = 240;

interface SideBarProps {
  selected?: number;
  setSelected: (i: number) => void;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // marginTop: 70,
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

const SideBar: FC<SideBarProps> = function SideBar({ setSelected, selected }) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [schemaLink, setSchemaLink] = useRecoilState(schemaLinkState);
  const [database, setDatabase] = useRecoilState(databaseState);
  const [naturalLanguage, setNaturalLanguage] =
    useRecoilState(naturalLanguageState);
  const { data: schemaLinks } = useSchemaLinksTemp({
    naturalLanguage: naturalLanguage,
    enabled: !!naturalLanguage,
  });

  return (
    <Drawer variant="permanent" open={!!schemaLinks}>
      <Divider />
      <List component="nav">
        {schemaLinks &&
          schemaLinks.map((s, i) => {
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

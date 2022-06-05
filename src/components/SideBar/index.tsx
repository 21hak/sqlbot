import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import {
  Divider,
  IconButton,
  List,
  Paper,
  styled,
  Toolbar,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useSchemaLinksTemp } from "../../apis/hooks";
import {
  databaseState,
  schemaLinkState,
  schemaNaturalLanguage,
} from "../../atoms";
import Dropdown from "../Dropdown/Dropdown";
import FormInputText from "../FormInputText/FormInputText";

const drawerWidth: number = 240;

interface SideBarProps {
  selected?: number;
  setSelected: (i: number) => void;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  marginTop: 70,
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
  const [naturalLanguage, setNaturalLanguage] = useRecoilState(
    schemaNaturalLanguage
  );
  const { data: schemaLinks } = useSchemaLinksTemp({
    naturalLanguage: naturalLanguage,
    enabled: !!naturalLanguage,
  });
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data: any) => {
    setNaturalLanguage(data.sql);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "column",
          px: [1],
          mt: 2,
        }}>
        <Dropdown
          items={["default"]}
          label={"database"}
          onSelect={setDatabase}
        />
        <Paper
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            mt: 1,
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}>
          <FormInputText name="sql" control={control} />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Toolbar>
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

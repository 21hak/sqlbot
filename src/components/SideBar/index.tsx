import DashboardIcon from "@mui/icons-material/Dashboard";
import { Divider, List, styled } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { FC } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useAttentionWeights, useSchemaLinks } from "../../apis/hooks";
import {
  attentionWeightState,
  databaseState,
  naturalLanguageState,
  schemaLinkState,
} from "../../atoms";

const drawerWidth: number = 240;

interface SideBarProps {}

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

const SideBar: FC<SideBarProps> = function SideBar({}) {
  const [schemaLink, setSchemaLink] = useRecoilState(schemaLinkState);
  const database = useRecoilValue(databaseState);
  const { data: attentionWeightsData } = useAttentionWeights({
    token: schemaLink.word,
    database: database,
    enabled: !!schemaLink && !!database,
  });
  const setAttentionWeight = useSetRecoilState(attentionWeightState);
  const naturalLanguage = useRecoilValue(naturalLanguageState);
  const { data: schemaLinks } = useSchemaLinks({
    naturalLanguage: naturalLanguage,
    database,
    enabled: !!naturalLanguage && !!database,
  });
  const handleClickToken = (index: number) => {
    if (attentionWeightsData) {
      const attentionWeight = attentionWeightsData[index];
      setAttentionWeight({
        word: attentionWeight.word,
        weights: attentionWeight.weights.map((f) => {
          return { key: f.key, weight: f.weight };
        }),
      });
    }
  };

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
                  handleClickToken(i);
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

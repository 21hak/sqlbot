import { Box, List, ListItem, ListItemText } from "@mui/material";
import React, { FC } from "react";

interface AttentionWeightListProps {
  visible: boolean;
  weights: Array<{ key: string; weight: number }>;
}
const AttenWeightList: FC<AttentionWeightListProps> = function AttenWeightList({
  visible,
  weights,
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: "100%",
        backgroundColor: "transparent",
        display: visible ? "initial" : "none",

        pl: 1,
        zIndex: 1,
      }}>
      <List
        sx={{
          p: 1,
          backgroundColor: "white",
          borderRadius: 1,
          minWidth: 160,
        }}
        dense>
        {weights.map((weight, index) => (
          <ListItem
            disablePadding
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <ListItemText primary={weight.key} sx={{ pr: 1, m: 0 }} />
            <ListItemText
              primary={weight.weight}
              sx={{ flex: "0 1 auto", m: 0 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default AttenWeightList;

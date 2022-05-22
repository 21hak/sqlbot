import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import type { NextPage } from "next";
import React from "react";
import BeamSearchHistory from "../src/components/BeamSearchHistory";

const BeamSearchPage: NextPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* TODO: Layout */}

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}>
        <Toolbar />
        <Box sx={{ width: "100%", height: "100%" }}>
          <BeamSearchHistory />
        </Box>
      </Box>
    </Box>
  );
};

export default BeamSearchPage;

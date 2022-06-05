import BeamSearchHistory from "@/components/BeamSearchHistory";
import SubHeader from "@/components/SubHeader/SubHeader";
import Box from "@mui/material/Box";
import type { NextPage } from "next";
import React from "react";

const BeamSearchPage: NextPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
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
        <SubHeader />
        <Box sx={{ width: "100%", height: "100%" }}>
          <BeamSearchHistory />
        </Box>
      </Box>
    </Box>
  );
};

export default BeamSearchPage;

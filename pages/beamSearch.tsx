import Box from "@mui/material/Box";
import type { NextPage } from "next";
import React from "react";
import { useRecoilState } from "recoil";
import { beamSearchNaturalLanguage, naturalLanguageState } from "../src/atoms";
import BeamSearchHistory from "../src/components/BeamSearchHistory";
import SubHeader from "../src/components/SubHeader/SubHeader";

const BeamSearchPage: NextPage = () => {
  const [naturalLanguage, setNaturalLanguage] = useRecoilState(
  naturalLanguageState
  );
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
        <SubHeader setNaturalLanguage={setNaturalLanguage} />
        <Box sx={{ width: "100%", height: "100%" }}>
          <BeamSearchHistory />
        </Box>
      </Box>
    </Box>
  );
};

export default BeamSearchPage;

import Box from "@mui/material/Box";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useAttentionWeights } from "../src/apis/hooks";
import { schemaNaturalLanguage } from "../src/atoms";
import SideBar from "../src/components/SideBar";
import SubHeader from "../src/components/SubHeader/SubHeader";

const Schema = dynamic(() => import("../src/components/Schema"), {
  ssr: false,
});

const SchemaPage: NextPage = () => {
  const { data: attentionWeightsData } = useAttentionWeights();
  const [selected, setSelected] = useState<number>();
  const [naturalLanguage, setNaturalLanguage] = useRecoilState(
    schemaNaturalLanguage
  );

  return (
    <Box>
      <SubHeader setNaturalLanguage={setNaturalLanguage} />
      <Box sx={{ display: "flex" }}>
        <SideBar setSelected={setSelected} selected={selected} />
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
          <Schema
            attentionWeight={
              attentionWeightsData && selected
                ? attentionWeightsData[selected]
                : undefined
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SchemaPage;

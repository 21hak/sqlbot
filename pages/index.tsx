import Box from "@mui/material/Box";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useAttentionWeights, useSchemaLinks } from "../src/apis/hooks";
import SideBar from "../src/components/SideBar";

const Schema = dynamic(() => import("../src/components/Schema"), {
  ssr: false,
});

const SchemaPage: NextPage = () => {
  const { data: schemaLinksData } = useSchemaLinks();
  const { data: attentionWeightsData } = useAttentionWeights();
  const [selected, setSelected] = useState<number>();

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar
        schemaLinks={schemaLinksData ?? []}
        setSelected={setSelected}
        selected={selected}
      />
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
  );
};

export default SchemaPage;

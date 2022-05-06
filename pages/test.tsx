import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useAttentionWeights, useSchemaLinks } from "../src/apis/hooks";
import SideBar from "../src/components/SideBar";

const Schema = dynamic(() => import("../src/components/TestSchema"), {
  ssr: false,
});

const TestPage: NextPage = () => {
  const { data: schemaLinksData } = useSchemaLinks();
  const { data: attentionWeightsData } = useAttentionWeights();
  const [selected, setSelected] = useState<number>();

  return (
    <Box sx={{ display: "flex" }}>
      {/* TODO: Layout */}

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
        <Toolbar />
        <Container
          maxWidth="lg"
          sx={{
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}>
          <Schema />
        </Container>
      </Box>
    </Box>
  );
};

export default TestPage;

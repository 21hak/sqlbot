import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useAttentionWeights, useSchemaLinks } from "../src/apis/hooks";
import Header from "../src/components/Header";
import SideBar from "../src/components/SideBar";

const Schema = dynamic(() => import("../src/components/Scheme"), {
  ssr: false,
});

const Home: NextPage = () => {
  const { data: schemaLinksData } = useSchemaLinks();
  const { data: attentionWeightsData } = useAttentionWeights();
  // const [schemaLinks, setSchemaLinks] = useState<Array<SchemaLinkModel>>([]);
  // const [attenWeights, setAttentionWeights] = useState<
  //   Array<AttentionWeightModel>
  // >([]);

  const [selected, setSelected] = useState<number>();

  // useEffect(() => {
  //   setSchemaLinks(parseSchemaLinksData(schemaLinksData));
  // }, []);
  // useEffect(() => {
  //   setAttentionWeights(parseAttentionWeightsData(attentionWeightsData));
  // }, []);
  useEffect(() => {
    // if (selected) {
    //   const schemaLink = schemaLinks[selected];
    //   schemaLinks.forEach((link) => {
    //     link.full.forEach((full) => {
    //       const [tableName, columnName] = full.split(".");
    //       const domId = columnName ? `${tableName}-${columnName}` : tableName;
    //       const $ = document.getElementById(domId);
    //       $?.classList.remove("selected--full");
    //     });
    //     link.partial.forEach((partial) => {
    //       const [tableName, columnName] = partial.split(".");
    //       const domId = columnName ? `${tableName}-${columnName}` : tableName;
    //       const $ = document.getElementById(domId);
    //       $?.classList.remove("selected--partial");
    //     });
    //   });
    //   schemaLink.full.forEach((full) => {
    //     const [tableName, columnName] = full.split(".");
    //     const domId = columnName ? `${tableName}-${columnName}` : tableName;
    //     const $ = document.getElementById(domId);
    //     $?.classList.add("selected--full");
    //   });
    //   schemaLink.partial.forEach((partial) => {
    //     const [tableName, columnName] = partial.split(".");
    //     const domId = columnName ? `${tableName}-${columnName}` : tableName;
    //     const $ = document.getElementById(domId);
    //     $?.classList.add("selected--partial");
    //   });
    // }
  }, [selected]);

  // useEffect(() => {
  //   attenWeights.forEach(({ weights }) => {
  //     Object.entries(weights).forEach(([k, v]) => {
  //       const [tableName, columnName] = k.split(".");
  //       const domId = columnName ? `${tableName}-${columnName}` : tableName;
  //       const $ = document.getElementById(domId);
  //       if ($) {
  //         $.style.backgroundColor = "#FFFFFF";
  //       }
  //     });
  //   });
  //   if (selected) {
  //     const weights = attenWeights[selected].weights;
  //     if (weights) {
  //       Object.entries(weights).forEach(([k, v]) => {
  //         const [tableName, columnName] = k.split(".");
  //         const domId = columnName ? `${tableName}-${columnName}` : tableName;
  //         const $ = document.getElementById(domId);
  //         if ($) {
  //           $.style.backgroundColor = getColors(v);
  //         }
  //       });
  //     }
  //   }
  // }, [selected]);
  return (
    <Box sx={{ display: "flex" }}>
      {/* TODO: Layout */}
      <Header />
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
          <Schema
            attentionWeight={
              attentionWeightsData && selected
                ? attentionWeightsData[selected]
                : undefined
            }
            schemaLink={
              schemaLinksData && selected
                ? schemaLinksData[selected]
                : undefined
            }
          />
        </Container>
      </Box>
    </Box>
  );
};

export default Home;

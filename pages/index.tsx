import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import schemaLinksData from "../public/schemaLinksData.json";
import attentionWeightsData from "../public/attentionWeights.json";
import parseSchemaLinksData from "../src/lib/parseSchemaLinksData";
import { Badge, Divider, Drawer, IconButton, Toolbar } from "@mui/material";
import Header from "../src/components/Header";
import SideBar from "../src/components/SideBar";
import { AttentionWeightModel, SchemaLinkModel } from "../src/lib/models";
import dynamic from "next/dynamic";
import parseAttentionWeightsData from "../src/lib/parseAttentionWeightsData";
import getColors from "../src/lib/getColor";

const Schema = dynamic(() => import("../src/components/Scheme"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [schemaLinks, setSchemaLinks] = useState<Array<SchemaLinkModel>>([]);
  const [attenWeights, setAttentionWeights] = useState<
    Array<AttentionWeightModel>
  >([]);

  const [selected, setSelected] = useState<number>();
  useEffect(() => {
    setSchemaLinks(parseSchemaLinksData(schemaLinksData));
  }, []);
  useEffect(() => {
    setAttentionWeights(parseAttentionWeightsData(attentionWeightsData));
  }, []);
  useEffect(() => {
    if (selected) {
      const schemaLink = schemaLinks[selected];
      schemaLinks.forEach((link) => {
        link.full.forEach((full) => {
          const [tableName, columnName] = full.split(".");
          const domId = columnName ? `${tableName}-${columnName}` : tableName;
          const $ = document.getElementById(domId);
          $?.classList.remove("selected--full");
        });
        link.partial.forEach((partial) => {
          const [tableName, columnName] = partial.split(".");
          const domId = columnName ? `${tableName}-${columnName}` : tableName;
          const $ = document.getElementById(domId);
          $?.classList.remove("selected--partial");
        });
      });
      schemaLink.full.forEach((full) => {
        const [tableName, columnName] = full.split(".");
        const domId = columnName ? `${tableName}-${columnName}` : tableName;
        const $ = document.getElementById(domId);
        $?.classList.add("selected--full");
      });
      schemaLink.partial.forEach((partial) => {
        const [tableName, columnName] = partial.split(".");
        const domId = columnName ? `${tableName}-${columnName}` : tableName;
        const $ = document.getElementById(domId);
        $?.classList.add("selected--partial");
      });
    }
  }, [selected]);

  useEffect(() => {
    attenWeights.forEach(({ weights }) => {
      Object.entries(weights).forEach(([k, v]) => {
        const [tableName, columnName] = k.split(".");
        const domId = columnName ? `${tableName}-${columnName}` : tableName;
        const $ = document.getElementById(domId);
        if ($) {
          $.style.backgroundColor = "#FFFFFF";
        }
      });
    });
    if (selected) {
      const weights = attenWeights[selected].weights;
      if (weights) {
        Object.entries(weights).forEach(([k, v]) => {
          const [tableName, columnName] = k.split(".");
          const domId = columnName ? `${tableName}-${columnName}` : tableName;
          const $ = document.getElementById(domId);
          if ($) {
            $.style.backgroundColor = getColors(v);
          }
        });
      }
    }
  }, [selected]);
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <SideBar
        schemaLinks={schemaLinks}
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

export default Home;

import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import schemaLinksData from "../public/schemaLinksData.json";
import parseSchemaLinksData from "../src/lib/parseSchemaLinksData";
import { Badge, Divider, Drawer, IconButton, Toolbar } from "@mui/material";
import Header from "../src/components/Header";
import SideBar from "../src/components/SideBar";
import { SchemaLinkModel } from "../src/lib/models";
import dynamic from "next/dynamic";

const Schema = dynamic(() => import("../src/components/Scheme"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [schemaLinks, setSchemaLinks] = useState<Array<SchemaLinkModel>>([]);
  const [selected, setSelected] = useState<SchemaLinkModel>();
  useEffect(() => {
    setSchemaLinks(parseSchemaLinksData(schemaLinksData));
  }, []);
  useEffect(() => {
    if (selected) {
      // TODO: 테이블 데이터 받아서 style reset 시켜줘야함
      selected.full.forEach((full) => {});
      selected.partial.forEach((partial) => {
        const [tableName, columnName] = partial.split(".");

        const domId = columnName ? `${tableName}-${columnName}` : tableName;
        console.log(tableName, columnName);
        const $ = document.getElementById(domId);
        $?.classList.add("selected");
      });
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

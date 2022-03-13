import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";

// import createEngine, {
//   DefaultLinkModel,
//   DefaultNodeModel,
//   DiagramModel,
// } from "@projectstorm/react-diagrams";

// import { CanvasWidget } from "@projectstorm/react-canvas-core";
import Diagram from "../src/diagram";

const Graph: NextPage = () => {
  return (
    <Container
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
      <Diagram />
    </Container>
  );
};

export default Graph;

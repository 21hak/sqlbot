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
import { Box } from "@mui/material";

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
      }}>
      <Box sx={{ width: 1, height: 1 }}>
        <Diagram />
      </Box>
    </Container>
  );
};

export default Graph;

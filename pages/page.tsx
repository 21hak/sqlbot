import Box from "@mui/material/Box";
import { NextPage } from "next";
import { useRef } from "react";
import Candidates from "../src/components/Candidates/Candidates";
import VectorRepresentation from "../src/components/VectorRepresentation/VectorRepresentation";
// https://stackoverflow.com/questions/8672369/how-to-draw-a-line-between-two-divs
const Page: NextPage = () => {
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        paddingTop: "116px",
        display: "flex",
        height: "100vh",
        overflow: "auto",
      }}>
      <Box sx={{ width: "40%", height: "100%", p: 1 }}>
        <Candidates />
      </Box>
      {/* Representation */}

      <Box sx={{ width: "60%", height: "100%", p: 1, position: "relative" }}>
        {/* <div
          id="test"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
          }}></div> */}
        {/* <Box sx={{ width: "100%", height: "100%", position: "absolute" }} /> */}
        <VectorRepresentation />
      </Box>
    </Box>
  );
};

export default Page;
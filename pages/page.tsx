import Box from "@mui/material/Box";
import { NextPage } from "next";
import { useEffect, useRef } from "react";
import Candidates from "../src/components/Candidates/Candidates";
import VectorRepresentation from "../src/components/VectorRepresentation/VectorRepresentation";
// https://stackoverflow.com/questions/8672369/how-to-draw-a-line-between-two-divs
const Page: NextPage = () => {
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  useEffect(() => {
    console.log(ref1.current, ref2.current);
    if (ref1.current && ref2.current) {
      console.log(ref1.current, ref2.current);
      connect(ref1.current, ref2.current, "#0F0", 5);
    }
  }, [ref1.current, ref2.current]);
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
      <Box sx={{ width: "50%", height: "100%", p: 1 }}>
        <Candidates />
      </Box>
      {/* Representation */}

      <Box sx={{ width: "50%", height: "100%", p: 1 }}>
        <VectorRepresentation />
      </Box>
    </Box>
  );
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0),
];

function getOffset(el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight,
  };
}

function connect(div1, div2, color, thickness) {
  // draw a line connecting elements
  var off1 = getOffset(div1);
  var off2 = getOffset(div2);
  // bottom right
  var x1 = off1.left + off1.width;
  var y1 = off1.top + off1.height;
  // top right
  var x2 = off2.left + off2.width;
  var y2 = off2.top;
  // distance
  var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  // center
  var cx = (x1 + x2) / 2 - length / 2;
  var cy = (y1 + y2) / 2 - thickness / 2;
  // angle
  var angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
  // make hr
  var htmlLine =
    "<div style='padding:0px; margin:0px; height:" +
    thickness +
    "px; background-color:" +
    color +
    "; line-height:1px; position:absolute; left:" +
    cx +
    "px; top:" +
    cy +
    "px; width:" +
    length +
    "px; -moz-transform:rotate(" +
    angle +
    "deg); -webkit-transform:rotate(" +
    angle +
    "deg); -o-transform:rotate(" +
    angle +
    "deg); -ms-transform:rotate(" +
    angle +
    "deg); transform:rotate(" +
    angle +
    "deg);' />";
  //
  // alert(htmlLine);
  document.body.innerHTML += htmlLine;
}

export default Page;

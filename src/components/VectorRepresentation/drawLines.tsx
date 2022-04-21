import React, { Fragment } from "react";
import { render } from "react-dom";
import { Connection } from "./type";

function getOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight,
  };
}

export function connect({
  elem1,
  elem2,
  color,
  thickness = 1,
}: {
  elem1: HTMLElement;
  elem2: HTMLElement;
  color: string;
  thickness: number;
}) {
  // draw a line connecting elements
  const off1 = getOffset(elem1);
  const off2 = getOffset(elem2);
  console.log(off1, off2);
  // bottom right
  const x1 = off1.left + off1.width;
  const y1 = off1.top + off1.height;
  // top right
  const x2 = off2.left + off2.width;
  const y2 = off2.top;
  // distance
  const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  // center
  const cx = (x1 + x2) / 2 - length / 2;
  const cy = (y1 + y2) / 2 - thickness / 2;
  // angle
  const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
  // make hr
  const e = React.createElement(
    "div",
    {
      style: {
        padding: 0,
        margin: 0,
        height: thickness,
        backgroundColor: color,
        lineHeight: 1,
        position: "absolute",
        left: cx,
        top: cy,
        width: length,
        // transform: `rotate("${angle}"deg)`,
      },
    },
    ""
  );
  // <svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="350" stroke="black"/></svg>

  // document.getElementById("test")?.appendChild(e)
  //   x1,y1 indicates center of first div and
  // x2,y2 indicates center of second div
  return (
    // <svg width="5000" height="5000">
    <line
      x1={off1.left + off1.width / 2}
      y1={off1.top + off1.height / 2}
      x2={off2.left + off2.width / 2}
      y2={off2.top + off2.height / 2}
      stroke="black"
    />
    // </svg>
  );
  // render(
  //   <svg width="5000" height="5000">
  //     <line
  //       x1={off1.left + off1.width / 2}
  //       y1={off1.top + off1.height / 2}
  //       x2={off2.left + off2.width / 2}
  //       y2={off2.top + off2.height / 2}
  //       stroke="black"
  //     />
  //   </svg>,
  //   document.getElementById("test")
  // );
}

export default function drawLines({
  inputContainerElem,
  modelOutputContainerElem,
  rtaOutputContainerElem,
  connections,
}: {
  inputContainerElem: HTMLElement;
  modelOutputContainerElem: HTMLElement;
  rtaOutputContainerElem: HTMLElement;
  connections: Connection;
}) {
  const elems: any[] = [];
  const inputElem = inputContainerElem.children[connections.pos];
  connections.modelOutputs.forEach((modelOutput) => {
    elems.push(
      connect({
        elem1: inputElem as HTMLElement,
        elem2: modelOutputContainerElem.children[
          modelOutput.pos
        ] as HTMLElement,
        color: "#000000",
        thickness: 2,
      })
    );
  });
  const Lines = () => (
    <svg width="5000" height="5000">
      {elems.map((e, index) => (
        <Fragment key={index}>{e}</Fragment>
      ))}
    </svg>
  );
  render(<Lines />, document.getElementById("test"));
  // return elems;
}

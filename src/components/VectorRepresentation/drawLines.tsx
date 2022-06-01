import React, { Fragment } from "react";
import { render } from "react-dom";
import getColors from "../../lib/getColor";
import { Connection } from "./type";

function getOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();

  return {
    left: rect.left + window.screenX,
    top: rect.top + window.scrollY,
    right: rect.right + window.screenX,
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

  const containerOffset = getOffset(document.getElementById("test")!);

  return (
    <line
      x1={off1.right - containerOffset.left}
      y1={off1.top - containerOffset.top + off1.height / 2}
      x2={off2.left - containerOffset.left}
      y2={off2.top - containerOffset.top + off2.height / 2}
      stroke="black"
    />
  );
}

function resetColors({
  inputContainerElem,
  modelOutputContainerElem,
  rtaOutputContainerElem,
}: {
  inputContainerElem: HTMLElement;
  modelOutputContainerElem: HTMLElement;
  rtaOutputContainerElem: HTMLElement;
}) {
  Array.from(inputContainerElem.children).forEach((e) => {
    const htmlEl = e as HTMLElement;
    htmlEl.style.backgroundColor = "white";
  });
  Array.from(modelOutputContainerElem.children).forEach((e) => {
    const htmlEl = e as HTMLElement;
    htmlEl.style.backgroundColor = "white";
  });
  Array.from(rtaOutputContainerElem.children).forEach((e) => {
    const htmlEl = e as HTMLElement;
    htmlEl.style.backgroundColor = "white";
  });
}
function resetLines({
  inputContainerElem,
  modelOutputContainerElem,
  rtaOutputContainerElem,
}: {
  inputContainerElem: HTMLElement;
  modelOutputContainerElem: HTMLElement;
  rtaOutputContainerElem: HTMLElement;
}) {
  resetColors({
    inputContainerElem,
    modelOutputContainerElem,
    rtaOutputContainerElem,
  });
  const Lines = () => (
    <svg
      height="100%"
      width="100%"
      preserveAspectRatio="none"
      style={{ pointerEvents: "none" }}></svg>
  );
  render(<Lines />, document.getElementById("test"));
}
export default function drawLines({
  inputContainerElem,
  modelOutputContainerElem,
  rtaOutputContainerElem,
  connections,
  weights1,
  weights2,
}: {
  inputContainerElem: HTMLElement;
  modelOutputContainerElem: HTMLElement;
  rtaOutputContainerElem: HTMLElement;
  connections: Connection;
  weights1: number[];
  weights2: number[][];
}) {
  resetColors({
    inputContainerElem,
    modelOutputContainerElem,
    rtaOutputContainerElem,
  });
  if (connections.pos === -1) {
    resetLines({
      inputContainerElem,
      modelOutputContainerElem,
      rtaOutputContainerElem,
    });
    return;
  }
  const elems: any[] = [];
  const inputElem = inputContainerElem.children[connections.pos] as HTMLElement;
  inputElem.style.backgroundColor = "#0060ff";
  connections.modelOutputs.forEach((modelOutput) => {
    const fromElem = inputElem as HTMLElement;
    const toElem = modelOutputContainerElem.children[
      modelOutput.pos
    ] as HTMLElement;
    toElem.style.backgroundColor = getColors(weights1[modelOutput.pos]);
    elems.push(
      connect({
        elem1: fromElem,
        elem2: toElem,
        color: "#000000",
        thickness: 2,
      })
    );
    modelOutput.ratOutputs.pos.forEach((p) => {
      const fromElem = modelOutputContainerElem.children[
        modelOutput.pos
      ] as HTMLElement;
      const toElem = rtaOutputContainerElem.children[p] as HTMLElement;

      toElem.style.backgroundColor = getColors(weights2[modelOutput.pos][p]);

      elems.push(
        connect({
          elem1: fromElem,
          elem2: toElem,
          color: "#000000",
          thickness: 2,
        })
      );
    });
  });
  const Lines = () => (
    <svg
      height="100%"
      width="100%"
      preserveAspectRatio="none"
      style={{ pointerEvents: "none" }}>
      {elems.map((e, index) => (
        <Fragment key={index}>{e}</Fragment>
      ))}
    </svg>
  );
  render(<Lines />, document.getElementById("test"));
}

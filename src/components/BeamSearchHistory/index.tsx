import { Box } from "@mui/material";
import React, { FC, useMemo, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { useBeamSearchHistoryModel } from "../../apis/hooks";
import { BeamSearchHistoryModel } from "../../lib/models";

interface BeamSearchHistoryProps {}

interface Converted {
  name: string;
  attributes: Record<string, any>;
  score: number;
  children: Converted[];
}
function renameKeys(
  obj: BeamSearchHistoryModel,
  newKeys: Record<string, string>
) {
  const keyValues = Object.keys(obj).map((key) => {
    let newKey = null;
    if (key === "choice") {
      newKey = newKeys.choice;
    } else if (key === "next") {
      newKey = newKeys.next;
    } else {
      newKey = key;
    }
    if (key === "next") {
      obj[key] = obj[key].map((obj) => renameKeys(obj, newKeys));
    }
    return {
      [newKey]: obj[key],
    };
  });
  return Object.assign({}, ...keyValues);
}

const BeamSearchHistory: FC<BeamSearchHistoryProps> =
  function BeamSearchHistory() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<
      { left: number; top: number; score: number } | undefined
    >();
    const { data } = useBeamSearchHistoryModel();
    const convertedData = useMemo(
      () => data && renameKeys(data, { choice: "name", next: "children" }),
      [data]
    );

    return (
      <Box
        sx={{ width: "100%", height: "100%", position: "relative" }}
        ref={wrapperRef}>
        {convertedData && (
          <Tree
            collapsible={false}
            translate={{ x: 0, y: 600 }}
            data={convertedData}
            onNodeMouseOver={(node, e) => {
              const { data } = node;
              setPosition({
                left: e.clientX,
                top: e.clientY - (wrapperRef.current?.offsetTop ?? 0) - 60,
                score: node.data.score,
              });
            }}
            renderCustomNodeElement={renderRectSvgNode}
            onNodeMouseOut={() => {
              setPosition(undefined);
            }}
          />
        )}
        {position && (
          <Box
            sx={{
              width: 100,
              height: 100,
              position: "absolute",
              top: position.top,
              left: position.left,
              pointerEvents: "none",
            }}>
            {position.score}
          </Box>
        )}
      </Box>
    );
  };

export default BeamSearchHistory;

const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <circle cx="0" cy="0" r="15"></circle>
    <text fill="black" strokeWidth="1" x="-15" y="30">
      {nodeDatum.name}
    </text>
  </g>
);

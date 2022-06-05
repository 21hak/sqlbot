import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { FC, useMemo, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { useRecoilState } from "recoil";
import { useBeamSearchHistoryModelTemp } from "../../apis/hooks";
import { beamSearchNaturalLanguage, naturalLanguageState } from "../../atoms";

interface BeamSearchHistoryProps {}

interface Converted {
  name: string;
  attributes: Record<string, any>;
  score: number;
  children: Converted[];
}
function renameKeys(obj: Record<string, any>, newKeys: Record<string, string>) {
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
      obj[key] = obj[key].map((obj: any) => renameKeys(obj, newKeys));
    }
    return {
      [newKey]: obj[key],
    };
  });
  return Object.assign({}, ...keyValues);
}
const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
  .selected {
    stroke-width: 3;
    stroke: red;
  }

  touch-action: pinch-zoom;
`;

const BeamSearchHistory: FC<BeamSearchHistoryProps> =
  function BeamSearchHistory() {
    const [naturalLanguage, setNaturalLanguage] = useRecoilState(
      naturalLanguageState
    );
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<
      { left: number; top: number; score: number } | undefined
    >();
    const { data } = useBeamSearchHistoryModelTemp({
      nl: naturalLanguage,
      enabled: !!naturalLanguage,
    });

    const convertedData = useMemo(
      () => data && renameKeys(data, { choice: "name", next: "children" }),
      [data]
    );
    const getDynamicPathClass = ({ source, target }: any, orientation: any) => {
      if (target.data.selected && source.data.selected) {
        return "selected";
      }

      return "";
    };

    return (
      <Wrapper ref={wrapperRef}>
        {convertedData && (
          <Tree
            collapsible={false}
            translate={{ x: 0, y: 600 }}
            data={convertedData}
            onNodeMouseOver={(node: any, e: any) => {
              setPosition({
                left: e.clientX,
                top: e.clientY - (wrapperRef.current?.offsetTop ?? 0) - 60,
                score: node.data.score,
              });
            }}
            pathClassFunc={getDynamicPathClass}
            renderCustomNodeElement={renderRectSvgNode}
            onNodeMouseOut={() => {
              setPosition(undefined);
            }}
          />
        )}
        {position && (
          <Box
            sx={{
              position: "absolute",
              top: position.top,
              left: position.left,
              pointerEvents: "none",
              backgroundColor: "white",
              p: 1,
            }}>
            {position.score}
          </Box>
        )}
      </Wrapper>
    );
  };

export default BeamSearchHistory;

const renderRectSvgNode = ({
  nodeDatum,
  toggleNode,
  hierarchyPointNode,
  onNodeMouseOver,
  onNodeMouseOut,
}: {
  nodeDatum: any;
  toggleNode: any;
  hierarchyPointNode: any;
  onNodeMouseOver: any;
  onNodeMouseOut: any;
}) => {
  const yPos = hierarchyPointNode.depth % 2 === 1 ? 40 : -40;
  return (
    <g onMouseOver={onNodeMouseOver} onMouseOut={onNodeMouseOut}>
      <circle cx="0" cy="0" r="15"></circle>
      <text fill="black" strokeWidth="1" x="-15" y={yPos}>
        {nodeDatum.name}
      </text>
    </g>
  );
};

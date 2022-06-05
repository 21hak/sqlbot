import { Box, List, ListItem, ListItemText } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLanugageModelTemp } from "../../apis/hooks";
import { candidateState, dependencyNaturalLanguage } from "../../atoms";
import drawLines from "./drawLines";
import { Connection } from "./type";

interface VectorRepresentationProps {}

const VectorRepresentation: FC<VectorRepresentationProps> =
  function VectorRepresentation({}) {
    // const { data } = useLanugageModel();
    const candidate = useRecoilValue(candidateState);

    const [naturalLanguage, setNaturalLanguage] = useRecoilState(
      dependencyNaturalLanguage
    );
    const { data } = useLanugageModelTemp({
      nl: naturalLanguage,
      enabled: !!naturalLanguage,
    });
    const [inputToken, setInputToken] = useState<string>();
    const [connections, setConnections] = useState<Connection>();
    const inputRef = useRef<HTMLDivElement>(null);
    const modelOutputRef = useRef<HTMLDivElement>(null);
    const rtaOutputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (data) {
        const inputPos = data.inputTokens.findIndex((t) => t === candidate);
        if (inputPos > -1) {
          setInputToken(data.inputTokens[inputPos]);
          const weights1 = data.weights1[inputPos];

          const l: any[] = [];
          weights1.forEach((w, index) => {
            if (w > 0) {
              const weights2: number[] = [];
              data.weights2[index].forEach((w2, index) => {
                if (w2 > 0) {
                  weights2.push(index);
                }
              });
              l.push({ pos: index, ratOutputs: { pos: weights2 } });
            }
          });
          setConnections({ pos: inputPos, modelOutputs: [...l] });
        } else {
          setConnections({ pos: -1, modelOutputs: [] });
        }
      }
    }, [candidate]);

    useEffect(() => {
      if (
        data &&
        connections &&
        inputRef.current &&
        modelOutputRef.current &&
        rtaOutputRef.current
      ) {
        const inputPos = data.inputTokens.findIndex((t) => t === candidate);
        const weights1 = data.weights1[inputPos];
        const weights2 = data.weights2;
        drawLines({
          inputContainerElem: inputRef.current,
          modelOutputContainerElem: modelOutputRef.current,
          rtaOutputContainerElem: rtaOutputRef.current,
          connections: connections,
          weights1,
          weights2,
        });
      }
    }, [connections, inputRef.current, data]);

    return data ? (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          position: "relative",
        }}>
        <div
          id="test"
          style={{ position: "absolute", width: "100%", height: "100%" }}></div>
        <List sx={{ bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="input" />
          </ListItem>
          <div ref={inputRef}>
            {data.inputTokens.map((token, index) => (
              <ListItem
                key={index}
                sx={{ backgroundColor: inputToken === token ? "red" : "" }}>
                <ListItemText primary={token} />
              </ListItem>
            ))}
          </div>
        </List>
        <List sx={{ bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="Lanugage Model Output" />
          </ListItem>
          <div ref={modelOutputRef}>
            {data.inputTokens.map((token, index) => (
              <ListItem key={index}>
                <ListItemText primary={token} />
              </ListItem>
            ))}
          </div>
        </List>

        <List sx={{ bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="RAT-Layer Output" />
          </ListItem>
          <div ref={rtaOutputRef}>
            {data.outputTokens.map((token, index) => (
              <ListItem key={index}>
                <ListItemText primary={token} />
              </ListItem>
            ))}
          </div>
        </List>
      </Box>
    ) : null;
  };

export default VectorRepresentation;

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { useCandidates } from "../../apis/hooks";
import { candidateState } from "../../atoms";

interface CandidatesProps {}

const Candidates: FC<CandidatesProps> = function Candidates({}) {
  const { data } = useCandidates();
  const [candidate, setCandidate] = useRecoilState(candidateState);
  console.log(data);
  const [index, setIndex] = useState<number>();
  const handleClickWord = (i: number) => {
    setIndex(i);
  };
  const handleClickCandidate = (c: string) => {
    setCandidate(c);
  };
  console.log(candidate);
  return (
    <Box>
      {/* Natural Language */}
      <Typography variant="body1" sx={{ p: 1 }}>
        Original Natural Language Query
      </Typography>

      {data && (
        <Paper variant="outlined" sx={{ p: 1 }}>
          {data.words.map((word, index) => (
            <Typography
              key={index}
              variant="button"
              component="span"
              sx={{ mr: 1, cursor: "pointer" }}
              onClick={() => {
                handleClickWord(index);
              }}>
              {word}
            </Typography>
          ))}
        </Paper>
      )}

      {/* Replacement */}
      <Typography variant="body1" sx={{ p: 1 }}>
        Possible Replacements
      </Typography>
      {data && index !== undefined && (
        <List sx={{ width: "200px", bgcolor: "background.paper", p: 0 }}>
          {data.synonyms[index].map((s, index) => (
            <ListItem key={index} sx={{ p: 0 }}>
              <ListItemButton
                key={index}
                sx={{ p: 0 }}
                selected={s === candidate}
                onClick={() => {
                  handleClickCandidate(s);
                }}>
                <ListItemText primary={s} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Candidates;

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useRecoilState } from "recoil";
import { useCandidates } from "../../apis/hooks";
import { candidateState, tokenState } from "../../atoms";

interface CandidatesProps {}

const Candidates: FC<CandidatesProps> = function Candidates({}) {
  const { data } = useCandidates();
  // const [index, setIndex] = useState<number>();
  const [candidate, setCandidate] = useRecoilState(candidateState);
  const [token, setToken] = useRecoilState(tokenState);
  const tokenIndex = data?.words.findIndex((w) => w === token);

  const handleClickWord = (t: string) => {
    setToken(t);
  };
  const handleClickCandidate = (c: string) => {
    setCandidate(c);
  };

  return (
    <Box>
      {/* Natural Language */}
      <Typography variant="body1" sx={{ pb: 1 }}>
        Original Natural Language Query
      </Typography>

      {data && (
        <Paper variant="outlined" sx={{ p: 1 }}>
          {data.words.map((word, i) => (
            <Typography
              key={i}
              variant="button"
              component="span"
              sx={{
                mr: 1,
                cursor: "pointer",
                backgroundColor: token === word ? "red" : "",
              }}
              onClick={() => {
                handleClickWord(word);
              }}>
              {word}
            </Typography>
          ))}
        </Paper>
      )}

      <Typography variant="body1" sx={{ pb: 1, pt: 1 }}>
        Possible Replacements
      </Typography>
      {data && tokenIndex !== undefined && tokenIndex > -1 && (
        <List sx={{ width: "200px", bgcolor: "background.paper", p: 0 }}>
          {data.synonyms[tokenIndex].map((s, index) => (
            <ListItem key={index} sx={{ p: 0 }}>
              <ListItemButton
                key={index}
                sx={{ p: 0, pl: 1, pr: 1 }}
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

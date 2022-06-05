import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useCandidatesTemp } from "../../apis/hooks";
import {
  candidateState,
  dependencyNaturalLanguage,
  naturalLanguageState,
  tokenState,
} from "../../atoms";
import FormInputText from "../FormInputText/FormInputText";

interface CandidatesProps {}

const Candidates: FC<CandidatesProps> = function Candidates({}) {
  const [naturalLanguage, setNaturalLanguage] = useRecoilState(
    naturalLanguageState
  );

  const { data } = useCandidatesTemp({
    naturalLanguage,
    enabled: !!naturalLanguage,
  });

  const [candidate, setCandidate] = useRecoilState(candidateState);
  const [token, setToken] = useRecoilState(tokenState);
  const tokenIndex = data?.words.findIndex((w) => w === token);

  const handleClickWord = (t: string) => {
    setToken(t);
  };
  const handleClickCandidate = (c: string) => {
    setCandidate(c);
  };

  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data: any) => {
    setNaturalLanguage(data.sql);
  };

  return (
    <Box>
      {/* <Typography variant="body1" sx={{ pb: 1 }}>
        Natural Language
      </Typography> */}
      {/* <Paper
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
        }}>
        <FormInputText name="sql" control={control} />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper> */}

      {/* Natural Language */}
      <Typography variant="body1" sx={{ pb: 1 }}>
        Original Natural Language Query
      </Typography>

      {data && (
        <Paper
          variant="outlined"
          sx={{ p: 1, display: "flex", flexWrap: "wrap" }}>
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

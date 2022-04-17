import { Box, List, ListItem, ListItemText } from "@mui/material";
import React, { FC } from "react";
import { useLanugageModel } from "../../apis/hooks";

interface VectorRepresentationProps {}

const VectorRepresentation: FC<VectorRepresentationProps> =
  function VectorRepresentation({}) {
    const { data } = useLanugageModel();

    return data ? (
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <List
          sx={{ width: "200px", bgcolor: "background.paper" }}
          //   subheader={<ListSubheader component="div">Input</ListSubheader>}
        >
          <ListItem>
            <ListItemText primary="input" />
          </ListItem>
          {data.inputTokens.map((token, index) => (
            <ListItem key={index}>
              {/* <ListItemButton
                key={index}
                sx={{ p: 0 }}
                selected={s === candidate}
                onClick={() => {
                  handleClickCandidate(s);
                }}> */}
              <ListItemText primary={token} />
              {/* </ListItemButton> */}
            </ListItem>
          ))}
        </List>
        <List sx={{ width: "200px", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="Lanugage Model Output" />
          </ListItem>
          {data.inputTokens.map((token, index) => (
            <ListItem key={index}>
              <ListItemText primary={token} />
            </ListItem>
          ))}
        </List>

        <List sx={{ width: "200px", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="RAT-Layer Output" />
          </ListItem>
          {data.outputTokens.map((token, index) => (
            <ListItem key={index}>
              {/* <ListItemButton
                key={index}
                sx={{ p: 0 }}
                selected={s === candidate}
                onClick={() => {
                  handleClickCandidate(s);
                }}> */}
              <ListItemText primary={token} />
              {/* </ListItemButton> */}
            </ListItem>
          ))}
        </List>
        {/* <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "200px" }}>Input</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.inputTokens.map((token, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ border: 0 }}>
                    {token}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Lanugage Model Output</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.inputTokens.map((token, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ border: 0 }}>
                    {token}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>RAT-Layer Output</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.outputTokens.map((token, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ border: 0 }}>
                    {token}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Box>
    ) : null;
  };

export default VectorRepresentation;

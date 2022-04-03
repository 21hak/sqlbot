import {
  Box,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  DiagramEngine,
  PortModelAlignment,
  PortWidget,
} from "@projectstorm/react-diagrams";
import React, { FC, useState } from "react";
import { TableNodeModel } from "./TableNodeModel";
import { S } from "./TableNodeWidget.style";

export interface TableNodeWidgetProps {
  node: TableNodeModel;
  engine: DiagramEngine;
  size: number;
}

export const TableNodeWidget: FC<TableNodeWidgetProps> = function (props) {
  const { name, columns } = props.node.table;

  const [weightVisible, setWeightVisible] = useState(false);
  const handleMouseEnter = () => {
    setWeightVisible(true);
  };
  const handleMouseLeave = () => {
    setWeightVisible(false);
  };

  return (
    <S.StyledCard
      sx={{ minWidth: 230, position: "relative", overflow: "visible" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Box id={`${name}`} sx={{ m: 1 }}>
        {/* <CardHeader title={myState} /> */}
        <CardHeader title={name.toLocaleLowerCase()} sx={{ p: 1 }} />
      </Box>
      <CardContent sx={{ p: 1 }}>
        {columns.map(({ name: columnName, type }) => (
          <Box
            id={`${name.toLocaleLowerCase()}-${columnName.toLocaleLowerCase()}`}
            key={`${name.toLocaleLowerCase()}-${columnName.toLocaleLowerCase()}`}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pr: 1,
              pl: 1,
            }}>
            <Typography sx={{ fontSize: 14 }}>{columnName}</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {type}
            </Typography>
          </Box>
        ))}
      </CardContent>
      <PortWidget
        style={{
          top: 100 / 2 - 20,
          left: 0,
          position: "absolute",
        }}
        port={props.node.getPort(PortModelAlignment.LEFT)!}
        engine={props.engine}></PortWidget>
      <PortWidget
        style={{
          right: 0,
          top: props.size / 2 - 8,
          position: "absolute",
        }}
        port={props.node.getPort(PortModelAlignment.RIGHT)!}
        engine={props.engine}></PortWidget>
      <AttenWeightList visible={weightVisible} weights={props.node.weights} />
    </S.StyledCard>
  );
};

interface AttentionWeightListProps {
  visible: boolean;
  weights: Array<{ key: string; weight: number }>;
}
const AttenWeightList: FC<AttentionWeightListProps> = function AttenWeightList({
  visible,
  weights,
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: "100%",
        backgroundColor: "white",
      }}>
      <List sx={{ display: visible ? "initial" : "none" }} dense>
        {weights.map((weight) => (
          <ListItem disablePadding>
            <ListItemText primary={weight.key} />
            <ListItemText primary={weight.weight} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

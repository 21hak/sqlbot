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
import getColors from "../../lib/getColor";
import { TableNodeModel } from "./TableNodeModel";
import { S } from "./TableNodeWidget.style";

export interface TableNodeWidgetProps {
  node: TableNodeModel;
  engine: DiagramEngine;
  size: number;
}

export const TableNodeWidget: FC<TableNodeWidgetProps> = function ({
  node,
  engine,
  size,
}) {
  const { name, columns } = node.table;
  const { weights, links } = node;

  const [weightVisible, setWeightVisible] = useState(false);
  const handleMouseEnter = () => {
    setWeightVisible(true);
  };
  const handleMouseLeave = () => {
    setWeightVisible(false);
  };

  return (
    <S.StyledCard
      sx={{ minWidth: 230, position: "relative", overflow: "visible", p: 1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Box id={`${name}`} sx={{ m: 0 }}>
        <CardHeader
          title={name.toLocaleLowerCase()}
          sx={{
            p: 1,
            borderStyle: links.full.includes(name.toLocaleLowerCase())
              ? "solid"
              : links.partial.includes(name.toLocaleLowerCase())
              ? "dashed"
              : "none",
          }}
        />
      </Box>
      <CardContent sx={{ p: 0 }}>
        {columns.map(({ name: columnName, type }) => (
          <Box
            id={`${name.toLocaleLowerCase()}-${columnName.toLocaleLowerCase()}`}
            key={`${name.toLocaleLowerCase()}-${columnName.toLocaleLowerCase()}`}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pr: 1,
              pl: 1,
              backgroundColor: getColors(
                weights.find((w) => w.key === columnName.toLocaleLowerCase())
                  ?.weight ?? 1
              ),
              borderStyle: links.full.includes(columnName.toLocaleLowerCase())
                ? "solid"
                : links.partial.includes(columnName.toLocaleLowerCase())
                ? "dashed"
                : "none",
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
        port={node.getPort(PortModelAlignment.LEFT)!}
        engine={engine}
      />
      <PortWidget
        style={{
          right: 0,
          top: size / 2 - 8,
          position: "absolute",
        }}
        port={node.getPort(PortModelAlignment.RIGHT)!}
        engine={engine}
      />
      <AttenWeightList visible={weightVisible} weights={weights} />
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
        {weights.map((weight, index) => (
          <ListItem disablePadding key={index}>
            <ListItemText primary={weight.key} />
            <ListItemText primary={weight.weight} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

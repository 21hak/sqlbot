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
import { useRecoilValue } from "recoil";
import getColors from "../../lib/getColor";
import { schemaLinkState } from "../../atoms";
import { attentionWeightByTable } from "../../selectors";
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
  const attentionWeight = useRecoilValue(attentionWeightByTable(name));
  const schemaLink = useRecoilValue(schemaLinkState);

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
      <Box id={`${name}`} sx={{ m: 0, mb: 1 }}>
        <CardHeader
          title={name.toLocaleLowerCase()}
          sx={{
            p: 1,
            borderStyle: schemaLink.full.includes(name.toLocaleLowerCase())
              ? "solid"
              : schemaLink.partial.includes(name.toLocaleLowerCase())
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
                attentionWeight.weights.find(
                  (w) => w.key === columnName.toLocaleLowerCase()
                )?.weight ?? 1
              ),
              borderStyle: schemaLink.full.includes(
                columnName.toLocaleLowerCase()
              )
                ? "solid"
                : schemaLink.partial.includes(columnName.toLocaleLowerCase())
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

      {attentionWeight.weights.length > 0 && (
        <AttenWeightList
          visible={weightVisible}
          weights={attentionWeight.weights}
        />
      )}
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
        backgroundColor: "transparent",
        display: visible ? "initial" : "none",

        pl: 1,
        zIndex: 1,
      }}>
      <List
        sx={{
          p: 1,
          backgroundColor: "white",
          borderRadius: 1,
          minWidth: 160,
        }}
        dense>
        {weights.map((weight, index) => (
          <ListItem
            disablePadding
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <ListItemText primary={weight.key} sx={{ pr: 1, m: 0 }} />
            <ListItemText
              primary={weight.weight}
              sx={{ flex: "0 1 auto", m: 0 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

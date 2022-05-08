import { Box, CardContent, CardHeader } from "@mui/material";
import React, { FC, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useRecoilValue } from "recoil";
import ForeignKeyIcon from "../../../public/foreign-key.svg";
import PrimaryKeyIcon from "../../../public/primary-key.svg";
import { schemaLinkState } from "../../atoms";
import getColors from "../../lib/getColor";
import { TableModel } from "../../lib/models";
import { attentionWeightByTable } from "../../selectors";
import AttenWeightList from "../AttentionWeightBox/AttentionWeightBox";
import * as S from "./TableNode.style";
interface TableNodeProps {
  pk: string;
  table: TableModel;
}
const TableNode: FC<{ data: TableNodeProps; isConnectable: boolean }> =
  function TableNode({ data, isConnectable }) {
    const { table } = data;
    const { name, columns } = table;
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
        sx={{ minWidth: 230, position: "relative", overflow: "visible" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Box id={`${name}`}>
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
          {columns.map((column, index) => (
            <Box
              id={`${name.toLocaleLowerCase()}-${column.name.toLocaleLowerCase()}`}
              key={`${name.toLocaleLowerCase()}-${column.name.toLocaleLowerCase()}`}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
                padding: "0 24px 0 24px",
                backgroundColor: getColors(
                  attentionWeight.weights.find(
                    (w) => w.key === column.name.toLocaleLowerCase()
                  )?.weight ?? 1
                ),
                borderStyle: schemaLink.full.includes(
                  column.name.toLocaleLowerCase()
                )
                  ? "solid"
                  : schemaLink.partial.includes(column.name.toLocaleLowerCase())
                  ? "dashed"
                  : "none",
              }}>
              {/* <Typography sx={{ fontSize: 14 }}>{columnName}</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {type}
              </Typography> */}
              {/* <div
                key={index}
                style={{
                  position: "relative",
                  padding: "0 24px 0 24px",
                }}> */}
              {column.name === table.primaryKey && (
                <Handle
                  type="target"
                  id={column.name}
                  position={Position.Left}
                  style={{
                    position: "absolute",
                    left: 0,
                    transform: "translateY(-50%)",
                    top: "50%",
                    backgroundColor: "transparent",
                  }}
                  isConnectable={true}
                />
              )}

              {column.name === table.primaryKey && (
                <PrimaryKeyIcon
                  width={12}
                  style={{
                    display: "block",
                    position: "absolute",
                    left: 8,
                    transform: "translateY(-50%)",
                    top: "50%",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <span style={{ marginRight: 16 }}>{column.name}</span>
                <span>{column.type}</span>
              </div>
              {table.foreignKey.some((f) => f.name === column.name) && (
                <ForeignKeyIcon
                  width={12}
                  style={{
                    display: "block",
                    position: "absolute",
                    right: 8,
                    transform: "translateY(-50%)",
                    top: "50%",
                  }}
                />
              )}
              <Handle
                type="source"
                id={column.name.toLowerCase()}
                position={Position.Right}
                style={{
                  position: "absolute",
                  right: 0,
                  transform: "translateY(-50%)",
                  top: "50%",
                  backgroundColor: "transparent",
                }}
                isConnectable={true}
              />
              {/* </div> */}
            </Box>
          ))}
        </CardContent>

        {attentionWeight.weights.length > 0 && (
          <AttenWeightList
            visible={weightVisible}
            weights={attentionWeight.weights}
          />
        )}
      </S.StyledCard>
    );

    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "cetner",
            flexDirection: "column",
          }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            {table.name}
          </div>
          <div>
            {table.columns.map((column, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  padding: "0 24px 0 24px",
                }}>
                {column.name === table.primaryKey && (
                  <Handle
                    type="target"
                    id={column.name}
                    position={Position.Left}
                    style={{
                      position: "absolute",
                      left: 0,
                      transform: "translateY(-50%)",
                      top: "50%",
                      backgroundColor: "transparent",
                    }}
                    isConnectable={true}
                  />
                )}

                {column.name === table.primaryKey && (
                  <PrimaryKeyIcon
                    width={12}
                    style={{
                      display: "block",
                      position: "absolute",
                      left: 8,
                      transform: "translateY(-50%)",
                      top: "50%",
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <span style={{ marginRight: 16 }}>{column.name}</span>
                  <span>{column.type}</span>
                </div>
                {table.foreignKey.some((f) => f.name === column.name) && (
                  <ForeignKeyIcon
                    width={12}
                    style={{
                      display: "block",
                      position: "absolute",
                      right: 8,
                      transform: "translateY(-50%)",
                      top: "50%",
                    }}
                  />
                )}
                <Handle
                  type="source"
                  id={column.name.toLowerCase()}
                  position={Position.Right}
                  style={{
                    position: "absolute",
                    right: 0,
                    transform: "translateY(-50%)",
                    top: "50%",
                    backgroundColor: "transparent",
                  }}
                  isConnectable={true}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
export default TableNode;

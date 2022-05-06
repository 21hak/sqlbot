import React, { FC } from "react";
import { Handle, Position } from "react-flow-renderer";
import ForeignKeyIcon from "../../../public/foreign-key.svg";
import PrimaryKeyIcon from "../../../public/primary-key.svg";
import { TableModel } from "../../lib/models";
interface TableNodeProps {
  pk: string;
  table: TableModel;
}
const TableNode: FC<{ data: TableNodeProps; isConnectable: boolean }> =
  function TableNode({ data, isConnectable }) {
    const { table } = data;

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

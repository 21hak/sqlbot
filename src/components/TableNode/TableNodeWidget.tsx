import React, { FC } from "react";
import { TableNodeModel } from "./TableNodeModel";
import {
  DiagramEngine,
  PortModelAlignment,
  PortWidget,
} from "@projectstorm/react-diagrams";
import styled from "@emotion/styled";
import { S } from "./TableNodeWidget.style";
import { Sd } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

export interface TableNodeWidgetProps {
  node: TableNodeModel;
  engine: DiagramEngine;
  size: number;
}

export const TableNodeWidget: FC<TableNodeWidgetProps> = function (props) {
  const { name, columns } = props.node.table;

  return (
    <S.StyledCard sx={{ minWidth: 230, position: "relative" }}>
      <Box id={`${name}`} sx={{ m: 1 }}>
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
    </S.StyledCard>
    // <S.TableNodeWidgetWrapper size={200}>
    //   <S.TableName>{name}</S.TableName>
    //   <S.TableColumns>
    //     {columns.map(({ name, type }) => (
    //       <S.TableColumn key={name}>
    //         <S.ColumnName>{name}</S.ColumnName>
    //         <S.ColumnType>{type}</S.ColumnType>
    //       </S.TableColumn>
    //     ))}
    //   </S.TableColumns>
    //   <PortWidget
    //     style={{
    //       top: 100 / 2 - 20,
    //       left: 0,
    //       position: "absolute",
    //     }}
    //     port={props.node.getPort(PortModelAlignment.LEFT)!}
    //     engine={props.engine}></PortWidget>
    //   <PortWidget
    //     style={{
    //       right: 0,
    //       top: props.size / 2 - 8,
    //       position: "absolute",
    //     }}
    //     port={props.node.getPort(PortModelAlignment.RIGHT)!}
    //     engine={props.engine}></PortWidget>
    // </S.TableNodeWidgetWrapper>
  );
};
// export class TableNodeWidget extends React.Component<TableNodeWidgetProps> {
//   render() {
//     console.log("props", this.props);
//     return (
//       <S.TableNodeWidgetWrapper size={props.size}>
//         {/* <svg
// 					width={this.props.size}
// 					height={this.props.size}
// 					dangerouslySetInnerHTML={{
// 						__html:
// 							`
//           <g id="Layer_1">
//           </g>
//           <g id="Layer_2">
//             <polygon fill="mediumpurple" stroke="${
// 							this.props.node.isSelected() ? 'white' : '#000000'
// 						}" stroke-width="3" stroke-miterlimit="10" points="10,` +
// 							this.props.size / 2 +
// 							` ` +
// 							this.props.size / 2 +
// 							`,10 ` +
// 							(this.props.size - 10) +
// 							`,` +
// 							this.props.size / 2 +
// 							` ` +
// 							this.props.size / 2 +
// 							`,` +
// 							(this.props.size - 10) +
// 							` "/>
//           </g>
//         `
// 					}}
// 				/> */}
//         <S.TableName>TableName</S.TableName>
//         <S.TableColumns>
//           {COLUMNS.map((column) => (
//             <S.TableColumn key={column}>{column}</S.TableColumn>
//           ))}
//         </S.TableColumns>
//         <PortWidget
//           style={{
//             top: this.props.size / 2 - 8,
//             left: -8,
//             position: "absolute",
//           }}
//           port={this.props.node.getPort(PortModelAlignment.LEFT)!}
//           engine={this.props.engine}>
//           {/* <S.Port /> */}
//         </PortWidget>
//         <PortWidget
//           style={{
//             left: this.props.size - 8,
//             top: this.props.size / 2 - 8,
//             position: "absolute",
//           }}
//           port={this.props.node.getPort(PortModelAlignment.RIGHT)!}
//           engine={this.props.engine}>
//           {/* <S.Port /> */}
//         </PortWidget>
//       </S.TableNodeWidgetWrapper>
//     );
//   }
// }

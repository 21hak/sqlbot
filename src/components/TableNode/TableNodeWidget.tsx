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

export interface TableNodeWidgetProps {
  node: TableNodeModel;
  engine: DiagramEngine;
  size: number;
}

export const TableNodeWidget: FC<TableNodeWidgetProps> = function (props) {
  const { dbId, columnNames } = props.node.scheme;

  return (
    <S.TableNodeWidgetWrapper size={100}>
      <S.TableName>{dbId}</S.TableName>
      <S.TableColumns>
        {columnNames.map(([id, name]) => (
          <S.TableColumn key={name}>{name}</S.TableColumn>
        ))}
      </S.TableColumns>
      <PortWidget
        style={{
          top: 100 / 2 - 20,
          left: 0,
          position: "absolute",
        }}
        port={props.node.getPort(PortModelAlignment.LEFT)!}
        engine={props.engine}>
        {/* <S.Port /> */}
      </PortWidget>
      <PortWidget
        style={{
          right: 0,
          top: props.size / 2 - 8,
          position: "absolute",
        }}
        port={props.node.getPort(PortModelAlignment.RIGHT)!}
        engine={props.engine}>
        {/* <S.Port /> */}
      </PortWidget>
    </S.TableNodeWidgetWrapper>
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

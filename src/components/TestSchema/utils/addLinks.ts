import {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramEngine,
  PathFindingLinkFactory,
} from "@projectstorm/react-diagrams";
import { DBScheme } from "../../Scheme/utils/type";

function getRelations(schema: DBScheme) {
  const tables = schema.tableNamesOriginal;
  const relations = schema.foreignKeys.map(([f1, f2], index) => {
    // if (schema.primaryKeys.includes(f1)) {
    //   return {
    //     to: {
    //       table: tables[schema.columnNamesOriginal[f1][0]],
    //       column: schema.columnNamesOriginal[f1][1].toLowerCase(),
    //     },
    //     from: {
    //       table: tables[schema.columnNamesOriginal[f2][0]],
    //       column: schema.columnNamesOriginal[f2][1].toLowerCase(),
    //     },
    //   };
    // } else {
    return {
      to: {
        table: tables[schema.columnNamesOriginal[f2][0]],
        column: schema.columnNamesOriginal[f2][1].toLowerCase(),
      },
      from: {
        table: tables[schema.columnNamesOriginal[f1][0]],
        column: schema.columnNamesOriginal[f1][1].toLowerCase(),
      },
    };
    // }
  });
  return relations;
}

export default function addLinks({
  schema,
  nodes,
  engine,
}: {
  schema: DBScheme;
  nodes: DefaultNodeModel[];
  engine: DiagramEngine;
}) {
  const links: DefaultLinkModel[] = [];
  const pathfinding = engine
    .getLinkFactories()
    .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME);
  const relations = getRelations(schema);
  console.log("relations", relations);
  relations.forEach((relation) => {
    const fromNode = nodes.find(
      (n) => n.getOptions().name === relation.from.table
    );
    const toNode = nodes.find((n) => n.getOptions().name === relation.to.table);
    // console.log("from", fromNode?.getOptions().name);
    // console.log("to", toNode?.getOptions().name);
    if (fromNode && toNode) {
      const fromPort = fromNode.getOutPorts().find((p) => {
        return p.getOptions().label === relation.from.column;
      });

      //   const toPort = toNode.getOutPorts().find((p) => {
      //     return p.getOptions().label === relation.to.column;
      //   });

      const toPort = toNode.getInPorts()[0];

      if (fromPort && toPort) {
        // const link = fromPort.link(toPort, pathfinding);
        console.log("==port", fromPort, toPort);
        const link = fromPort.link<DefaultLinkModel>(toPort);
        links.push(link);
      }
    }

    //   nodes[relation.from]
  });
  //   nodes.forEach((node) => {
  //     const pk = node.getInPorts();
  //     console.log("pk", pk);
  //     relations.forEach((relation) => {
  //       // const link1 = port1.link(port4, pathfinding);
  //       // const link2 = port2.link(port3, pathfinding);
  //     });
  //   });
  console.log(links);
  return links;
}

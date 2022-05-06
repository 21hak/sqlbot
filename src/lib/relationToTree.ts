import { DBScheme } from "../components/Scheme/utils/type";
import { TableModel } from "./models";

export default function relationToTree(tables: TableModel[]) {}
function getRelations(schema: DBScheme, tableModels: TableModel[]) {
  const roots = [];

  const entries = schema.tableNamesOriginal.map((t, index) => ({
    id: index,
    name: t,
    parentId: null as null | number,
    children: [] as any[],
  }));
  schema.foreignKeys.map(([f1, f2], index) => {
    // entries[f1].children.push(schema.tableNamesOriginal[f2]);
    entries[f2].parentId = schema.tableNamesOriginal[f1];
  });
  entries.forEach((entry, index) => {
    let node = entry;
    if (entry.parentId) {
      entries[entry.parentId].children.push(node);
    }
  });

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

function list_to_tree(list) {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== "0") {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

var entries = [
  {
    id: "12",
    parentId: "0",
    text: "Man",
    level: "1",
    children: null,
  },
  {
    id: "6",
    parentId: "12",
    text: "Boy",
    level: "2",
    children: null,
  },
  {
    id: "7",
    parentId: "12",
    text: "Other",
    level: "2",
    children: null,
  },
  {
    id: "9",
    parentId: "0",
    text: "Woman",
    level: "1",
    children: null,
  },
  {
    id: "11",
    parentId: "9",
    text: "Girl",
    level: "2",
    children: null,
  },
];

console.log(list_to_tree(entries));

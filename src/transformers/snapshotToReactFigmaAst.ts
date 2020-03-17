import * as t from "@babel/types";

export const snapshotToReactFigmaAst = snapshot => {
  const ComponentNode = t.exportNamedDeclaration(
    t.variableDeclaration("const", [
      t.variableDeclarator(
        t.identifier("Component"),
        t.arrowFunctionExpression(
          [],
          t.blockStatement([t.returnStatement(convertToJsxElement(snapshot))])
        )
      )
    ])
  );

  return t.program([ComponentNode]);
};

const ElementToComponent = {
  COMPONENT: "Component",
  PAGE: "Page",
  FRAME: "View",
  GROUP: "View",
  SLICE: "Slice",
  RECTANGLE: "View",
  LINE: "Line",
  ELLIPSE: "Ellipse",
  POLYGON: "Polygon",
  STAR: "Star",
  VECTOR: "Vector",
  TEXT: "Text",
  INSTANCE: "Instance",
  BOOLEAN_OPERATION: "BooleanOperation"
};

const convertToAttributes = snapshot => {
  return Object.keys(snapshot)
    .filter(key => key !== "type" && key !== "children")
    .map(key =>
      t.jsxAttribute(
        t.jsxIdentifier(key),
        typeof snapshot[key] === "number" &&
          t.jsxExpressionContainer(t.numericLiteral(snapshot[key]))
      )
    );
};

const convertToJsxElement = snapshot => {
  if (!snapshot.children || snapshot.children.length === 0) {
    return t.jsxElement(
      t.jsxOpeningElement(
        t.jsxIdentifier(ElementToComponent[snapshot.type] || "View"),
        convertToAttributes(snapshot),
        true
      ),
      null,
      [],
      null
    );
  } else {
    return t.jsxElement(
      t.jsxOpeningElement(
        t.jsxIdentifier(ElementToComponent[snapshot.type] || "View"),
        convertToAttributes(snapshot),
        false
      ),
      t.jsxClosingElement(
        t.jsxIdentifier(ElementToComponent[snapshot.type] || "View")
      ),
      snapshot.children.map(convertToJsxElement),
      null
    );
  }
};

import * as t from "@babel/types";

export const snapshotToReactFigmaAst = snapshot => {
  const context = {
    reactFigmaImportSpecifiers: []
  };
  const ComponentNode = t.exportNamedDeclaration(
    t.variableDeclaration("const", [
      t.variableDeclarator(
        t.identifier("Component"),
        t.arrowFunctionExpression(
          [],
          t.blockStatement([
            t.returnStatement(convertToJsxElement(snapshot, context))
          ])
        )
      )
    ])
  );

  const reactImportDeclaration = t.importDeclaration(
    [t.importNamespaceSpecifier(t.identifier("React"))],
    t.stringLiteral("react")
  );

  const reactFigmaImportDeclaration =
    context.reactFigmaImportSpecifiers.length > 0 &&
    t.importDeclaration(
      context.reactFigmaImportSpecifiers.map(specifierName => {
        return t.importSpecifier(
          t.identifier(specifierName),
          t.identifier(specifierName)
        );
      }),
      t.stringLiteral("react-figma")
    );

  return t.program([
    reactImportDeclaration,
    ...(reactFigmaImportDeclaration ? [reactFigmaImportDeclaration] : []),
    ComponentNode
  ]);
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

const convertToJsxElement = (snapshot, context) => {
  const typeToElementName = type => {
    const result = ElementToComponent[type] || "View";
    if (context.reactFigmaImportSpecifiers.indexOf(result) < 0) {
      context.reactFigmaImportSpecifiers.push(result);
    }
    return result;
  };
  if (!snapshot.children || snapshot.children.length === 0) {
    return t.jsxElement(
      t.jsxOpeningElement(
        t.jsxIdentifier(typeToElementName(snapshot.type)),
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
        t.jsxIdentifier(typeToElementName(snapshot.type)),
        convertToAttributes(snapshot),
        false
      ),
      t.jsxClosingElement(t.jsxIdentifier(typeToElementName(snapshot.type))),
      snapshot.children.map(item => convertToJsxElement(item, context)),
      null
    );
  }
};

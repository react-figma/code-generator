import * as t from "@babel/types";

export const snapshotToReactFigmaAst = snapshot => {
  const ComponentNode = t.exportNamedDeclaration(
    t.variableDeclaration("const", [
      t.variableDeclarator(
        t.identifier("Component"),
        t.arrowFunctionExpression(
          [],
          t.blockStatement([
            t.returnStatement(
              t.jsxElement(
                t.jsxOpeningElement(
                  t.jsxIdentifier(ElementToComponent[snapshot.type]),
                  convertToAttributes(snapshot),
                  true
                ),
                null,
                [],
                null
              )
            )
          ])
        )
      )
    ])
  );

  return t.program([ComponentNode]);
};

const ElementToComponent = {
  COMPONENT: "Component"
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

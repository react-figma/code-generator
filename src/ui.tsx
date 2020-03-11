import generate from '@babel/generator';
import * as t from "@babel/types";

const ElementToComponent = {
    "COMPONENT": "Component"
};

onmessage = event => {
    console.log(event);

    const root = event.data && event.data.pluginMessage;
    const output = generate(snapshotToAst(root));
    console.log(output.code);
};

const convertToAttributes = (snapshot) => {
    return Object.keys(snapshot)
        .filter((key) => key !== "type" && key !== "children")
        .map((key) => t.jsxAttribute(
            t.jsxIdentifier(key),
            typeof snapshot[key] === "number" && t.jsxExpressionContainer(
                t.numericLiteral(snapshot[key])
            )
        ))
};

const snapshotToAst = (snapshot) => {
    const ComponentNode = t.exportNamedDeclaration(
        t.variableDeclaration(
            "const",
            [t.variableDeclarator(
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
            )]
        )
    );

    return t.program([
        ComponentNode
    ]);
};

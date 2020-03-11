import generate from '@babel/generator';
import * as t from "@babel/types";

const ast = t.program(
    [t.variableDeclaration(
        "let",
        [t.variableDeclarator(
            t.identifier("a")
        )]
    )]
);

const output = generate(ast);
console.log(output.code);

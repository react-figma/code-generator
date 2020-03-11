const generate = require('@babel/generator');
const t = require("@babel/types");

const ast = t.program(
    [t.variableDeclaration(
        "let",
        [t.variableDeclarator(
            t.identifier("a")
        )]
    )]
);

const output = generate.default(ast);
console.log(output.code);

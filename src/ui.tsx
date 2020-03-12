import generate from "@babel/generator";
import { snapshotToReactFigmaAst } from "./transformers/snapshotToReactFigmaAst";

onmessage = event => {
  console.log(event);

  const root = event.data && event.data.pluginMessage;
  const output = generate(snapshotToReactFigmaAst(root));
  console.log(output.code);
};

import generate from "@babel/generator";
import { snapshotToReactFigmaAst } from "./transformers/snapshotToReactFigmaAst";

const sendToIFrame = code => {
  const iframeEl = document.getElementById("editor-iframe");
  if (!iframeEl) {
    return;
  }
  const iframeWin = (iframeEl as HTMLIFrameElement).contentWindow;
  iframeWin.postMessage(code, "https://figma-code-gen.now.sh/");
};

onmessage = event => {
  console.log(event);

  const root = event.data && event.data.pluginMessage;
  const output = generate(snapshotToReactFigmaAst(root));
  console.log(output.code);

  sendToIFrame(output.code);
};

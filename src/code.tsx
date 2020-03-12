import { serialize } from "./serialize";

figma.showUI(__html__, {
  height: 360,
  width: 600
});

figma.on("selectionchange", () => {
  figma.ui.postMessage(serialize(figma.currentPage.selection[0]));
});

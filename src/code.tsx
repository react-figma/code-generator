import { serialize } from "./serialize";

figma.showUI(__html__, { visible: false });

figma.on("selectionchange", () => {
  figma.ui.postMessage(serialize(figma.currentPage.selection[0]));
});

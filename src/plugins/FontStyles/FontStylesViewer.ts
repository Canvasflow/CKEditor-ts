
import CanvasflowEditor from "../../BaseEditor";
export interface FontStylesViewer {
  editor: CanvasflowEditor;
  onClickBold: () => void;
  onClickItalic: () => void;
  onClickUnderline: () => void;
  onClickStrikethroug: () => void;
  onClickSubscript: () => void;
  onClickSuperscript: () => void;
}

export function hasAttribute(args: HasAttributeArgs): boolean {
  const { editor, attribute } = args;
  const { selection } = editor.model.document;
  if (!selection) {
    return false;
  }
  const range = selection.getFirstRange();
  if (!range) {
    return false;
  }

  for (const item of range.getItems()) {
    if (!item.hasAttribute(attribute)) {
      return false;
    }
  }

  return true;
}

interface HasAttributeArgs {
  editor: CanvasflowEditor;
  attribute: string;
}
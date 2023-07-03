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

import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const CLEAR = "clear";
export class ClearFormattingCommands extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(CLEAR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      CLEAR,
    );
  }

  execute() {
    const model = this.editor.model;
    model.change(() => {
      this.editor.execute("removeFormat");
    });
  }
}

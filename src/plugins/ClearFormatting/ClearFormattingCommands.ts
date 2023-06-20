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
    const document = model.document;
    const selection = document.selection;

    model.change((writer) => {
      const ranges = model.schema.getValidRanges(selection.getRanges(), CLEAR);
      for (const range of ranges) {
        // console.log(range);
        // console.log(range.getItems());
        writer.setAttributes({ clear: "" }, range);
      }
    });
  }
}

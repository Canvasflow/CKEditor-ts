import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const LOWERCASE = "lowercase";
export class LowercaseCommands extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(LOWERCASE);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      LOWERCASE,
    );
  }

  execute() {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        LOWERCASE,
      );

      for (const range of ranges) {
        writer.setAttributes(
          {
            lowercase: "text-transform:lowercase;",
          },
          range,
        );
      }
    });
  }
}
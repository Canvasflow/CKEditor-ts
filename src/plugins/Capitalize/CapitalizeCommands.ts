import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const CAPITALIZE = "capitalize";
export class CapitalizeCommands extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(CAPITALIZE);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      CAPITALIZE,
    );
  }

  execute() {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        CAPITALIZE,
      );

      for (const range of ranges) {
        writer.setAttributes(
          {
            capitalize: "text-transform:capitalize;",
          },
          range,
        );
      }
    });
  }
}

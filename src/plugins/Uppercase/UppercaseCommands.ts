import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const UPPERCASE = "uppercase";
export class UppercaseCommands extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute("uppercase");
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      "uppercase",
    );
  }

  execute() {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    const value = "uppercase";
    console.log(model);
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        "uppercase",
      );

      for (const range of ranges) {
        writer.setAttributes(
          {
            uppercase: "text-transform:uppercase;",
          },
          range,
        );
      }
    });
  }
}

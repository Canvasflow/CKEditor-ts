import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";

export class LinkCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute("Link");
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      "Link",
    );
  }

  execute(url: string) {
    this.editor.model.change(async (writer) => {
      const selection = this.editor.model.document.selection;
      if (!selection) {
        return;
      }
      const range = selection.getFirstRange();
      if (!range) {
        return;
      }
    });
  }
}

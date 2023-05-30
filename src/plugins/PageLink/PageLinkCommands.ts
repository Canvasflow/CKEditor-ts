import CanvasflowEditor from "./../../BaseCanvasflowEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";

export class PageLinkCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute("PageLink");
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      "PageLink",
    );
  }

  execute(id: string) {
    console.log(id);
    this.editor.model.change(async (writer) => {
      const selection = this.editor.model.document.selection;
      const range = selection.getFirstRange();
      if (range) {
        let value = "";
        for (const item of range.getItems()) {
          value = item.data;
          writer.remove(item);
        }
        const selection = this.editor.model.document.selection;
        var position = selection.getFirstPosition();
        if (position) {
          writer.insertText(value, { linkHref: `article/${id}` }, position);
        }
      }
    });
  }
}

import CanvasflowEditor from "../../BaseEditor";
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
      if (!selection) {
        return;
      }
      const range = selection.getFirstRange();
      if (!range) {
        return;
      }
      let value = "";
      console.log(range);
      for (const item of range.getItems()) {
        const proxy = item as any;
        value = proxy.data;
        writer.remove(item);
      }

      var position = selection.getFirstPosition();
      if (position) {
        writer.insertText(value, { linkHref: `/article/${id}` }, position);
      }
    });
  }
}

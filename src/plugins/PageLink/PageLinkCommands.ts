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

  execute() {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    console.log("PageLink Command Execute called");
    this.editor.model.change((writer) => {
      const insertPosition =
        this.editor.model.document.selection.getFirstPosition();
      console.log(insertPosition);
      //writer.insertText(linkText, { linkHref: "google.com" }, insertPosition);
    });
  }
}

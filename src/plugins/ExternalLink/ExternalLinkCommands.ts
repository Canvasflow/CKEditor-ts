import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";

export class ExternalLinkCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute("ExternalLink");
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      "ExternalLink",
    );
  }

  execute(url: string, protocol: boolean, newTab: boolean) {
    this.editor.model.change(async (writer) => {
      console.log(
        "creating URL: ",
        url,
        " protocol: ",
        protocol,
        " newTab: ",
        newTab,
      );
      const selection = this.editor.model.document.selection;
      if (!selection) {
        return;
      }
      const range = selection.getFirstRange();
      if (!range) {
        return;
      }
      let value = "";
      for (const item of range.getItems()) {
        const proxy = item as any;
        value = proxy.data;
        writer.remove(item);
      }

      var position = selection.getFirstPosition();
      if (position) {
        writer.insertText(value, { linkHref: url, target: "_blank" }, position);
      }
    });
  }
}

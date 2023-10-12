import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";

export const TEXT_SIZE_ATTR = "font-size";
export const TEXT_SIZE_COMMAND = "setTextSize";

export class FontSizeCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(TEXT_SIZE_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      TEXT_SIZE_ATTR,
    );
  }

  execute(size: string) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        TEXT_SIZE_ATTR,
      );

      for (const range of ranges) {
        const attr: any = {};
        attr[TEXT_SIZE_ATTR] = size;
        writer.setAttributes(attr, range);
      }
    });
  }
}

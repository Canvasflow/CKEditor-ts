import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const TEXT_TRANSFORM_ATTR = "text-transform";
export const TEXT_TRANSFORM_COMMAND = "setTextTransform";

export class TextTransformCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(TEXT_TRANSFORM_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      TEXT_TRANSFORM_ATTR,
    );
  }

  execute(value: TextTransformValues) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        TEXT_TRANSFORM_ATTR,
      );

      for (const range of ranges) {
        const attr: any = {};
        attr[TEXT_TRANSFORM_ATTR] = value;
        writer.setAttributes(attr, range);
      }
    });
  }
}

type TextTransformValues = "uppercase" | "lowercase" | "capitalize";

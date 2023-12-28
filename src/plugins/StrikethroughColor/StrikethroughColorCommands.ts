import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const STRIKETHROUGH_COLOR_ATTR = "text-decoration-color";
export const CLEAR_STRIKETHROUGH_TEXT_COLOR_COMMAND =
  "clearStrikethroughTextColor";
export const SET_STRIKETHROUGH_TEXT_COLOR_COMMAND = "setStrikethroughTextColor";

export class StrikethroughColorCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(STRIKETHROUGH_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      STRIKETHROUGH_COLOR_ATTR,
    );
  }

  execute(color: any) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;

    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        STRIKETHROUGH_COLOR_ATTR,
      );

      for (const range of ranges) {
        const attr: any = {};
        attr[STRIKETHROUGH_COLOR_ATTR] = color;
        writer.setAttributes(attr, range);
      }
    });
  }
}

export class ClearStrikethroughColorCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(STRIKETHROUGH_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      STRIKETHROUGH_COLOR_ATTR,
    );
  }

  execute() {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        STRIKETHROUGH_COLOR_ATTR,
      );

      for (const range of ranges) {
        writer.removeAttribute(STRIKETHROUGH_COLOR_ATTR, range);
      }
    });
  }
}

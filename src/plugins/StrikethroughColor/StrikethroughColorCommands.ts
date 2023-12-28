import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const TEXT_COLOR_ATTR = "fontColor";
export const CLEAR_TEXT_COLOR_COMMAND = "clearTextColor";
export const SET_TEXT_COLOR_COMMAND = "setTextColor";

export class StrikethroughColorCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(TEXT_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      TEXT_COLOR_ATTR,
    );
  }

  execute(color: any) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    const value = color;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        TEXT_COLOR_ATTR,
      );

      for (const range of ranges) {
        if (value) {
          writer.setAttributes(
            {
              fontColor: value,
            },
            range,
          );
        }
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
    this.value = doc.selection.getAttribute(TEXT_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      TEXT_COLOR_ATTR,
    );
  }

  execute() {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        TEXT_COLOR_ATTR,
      );

      for (const range of ranges) {
        writer.removeAttribute(TEXT_COLOR_ATTR, range);
      }
    });
  }
}

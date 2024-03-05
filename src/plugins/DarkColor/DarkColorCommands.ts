import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const DARK_COLOR_ATTR = "dark-mode-color";
export const CLEAR_DARK_COLOR_COMMAND = "clearDarkColor";
export const SET_DARK_COLOR_COMMAND = "setDarkColor";

export class DarkColorCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(DARK_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      DARK_COLOR_ATTR,
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
        DARK_COLOR_ATTR,
      );

      for (const range of ranges) {
        if (value) {
          writer.setAttributes({ "dark-mode-color": value }, range);
        }
      }
    });
  }
}

export class ClearDarkColorCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(DARK_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      DARK_COLOR_ATTR,
    );
  }

  execute() {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        DARK_COLOR_ATTR,
      );

      for (const range of ranges) {
        writer.removeAttribute(DARK_COLOR_ATTR, range);
      }
    });
  }
}

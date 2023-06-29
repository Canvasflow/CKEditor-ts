import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const BACKGROUND_COLOR_ATTR = "backgroundColor";
export const CLEAR_BACKGROUND_COLOR_COMMAND = "clearBackground";
export const SET_BACKGROUND_COLOR_COMMAND = "setBackgroundColor";
export class FontBackgroundCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(BACKGROUND_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      BACKGROUND_COLOR_ATTR,
    );
  }

  execute(paletteKey: any, color: any) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    const value = paletteKey || color;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        BACKGROUND_COLOR_ATTR,
      );

      for (const range of ranges) {
        if (value) {
          writer.setAttributes(
            {
              backgroundColor: value,
            },
            range,
          );
        }
      }
    });
  }
}

export class ClearFontBackgroundCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(BACKGROUND_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      BACKGROUND_COLOR_ATTR,
    );
  }

  execute() {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        BACKGROUND_COLOR_ATTR,
      );

      for (const range of ranges) {
        writer.removeAttribute(BACKGROUND_COLOR_ATTR, range);
      }
    });
  }
}

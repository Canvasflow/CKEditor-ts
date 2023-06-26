import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";

export const FONT_COLOR_ATTR = "fontColor";
export const CLEAR_FONT_COLOR_COMMAND = "clearFontColor";
export const SET_FONT_COLOR_COMMAND = "setFontColor";

export class TextFontColorCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(FONT_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      FONT_COLOR_ATTR,
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
        FONT_COLOR_ATTR,
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

export class ClearFontColorCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(FONT_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      FONT_COLOR_ATTR,
    );
  }

  execute() {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        FONT_COLOR_ATTR,
      );

      for (const range of ranges) {
        writer.removeAttribute(FONT_COLOR_ATTR, range);
      }
    });
  }
}

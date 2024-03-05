import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const DARK_BACKGROUND_COLOR_ATTR = "dark-mode-background";
export const CLEAR_DARK_BACKGROUND_COLOR_COMMAND = "clearDarkBackgroundColor";
export const SET_DARK_BACKGROUND_COLOR_COMMAND = "setDarkBackgroundColor";

export class DarkBackgroundColorCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(DARK_BACKGROUND_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      DARK_BACKGROUND_COLOR_ATTR,
    );
  }

  execute(color: any) {
    console.log("EXCEUTED dark-mode-background");
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    const value = color;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        DARK_BACKGROUND_COLOR_ATTR,
      );

      for (const range of ranges) {
        if (value) {
          writer.setAttributes({ "dark-mode-background": value }, range);
        }
      }
    });
  }
}

export class ClearDarkBackgroundColorCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(DARK_BACKGROUND_COLOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      DARK_BACKGROUND_COLOR_ATTR,
    );
  }

  execute() {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        DARK_BACKGROUND_COLOR_ATTR,
      );

      for (const range of ranges) {
        writer.removeAttribute(DARK_BACKGROUND_COLOR_ATTR, range);
      }
    });
  }
}

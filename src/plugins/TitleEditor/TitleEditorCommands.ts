import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const TITLE_EDITOR_ATTR = "title";
export const TITLE_EDITOR_COMMAND = "setTitleEditor";
export const TITLE_EDITOR_CLEAR = "clearTitleEditor";

export class TitleEditorCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(TITLE_EDITOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      TITLE_EDITOR_ATTR,
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
        TITLE_EDITOR_ATTR,
      );

      for (const range of ranges) {
        if (value) {
          writer.setAttributes({ title: value }, range);
        }
      }
    });
  }
}

export class ClearTitleCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(TITLE_EDITOR_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      TITLE_EDITOR_ATTR,
    );
  }

  execute() {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        TITLE_EDITOR_ATTR,
      );

      for (const range of ranges) {
        writer.removeAttribute(TITLE_EDITOR_ATTR, range);
      }
    });
  }
}

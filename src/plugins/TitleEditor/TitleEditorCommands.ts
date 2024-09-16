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

  execute(title: any) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    const value = title;
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

  execute(selectedItem: any) {
    const model = this.editor.model;
    model.change((writer) => {
      writer.removeAttribute(TITLE_EDITOR_ATTR, selectedItem.textNode);
    });
  }

  // execute(selectedTitle: string, selectedText: string) {
  //   const model = this.editor.model;
  //   model.change(() => {
  //     let data = this.editor.data.get();

  //     const replaced = data.replace(
  //       `<span title="${selectedTitle}">${selectedText}</span>`,
  //       selectedText,
  //     );
  //     this.editor.data.set(replaced);
  //   });
  // }
}

import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const BACKGROUND_COLOR = "backgroundColor";
export class FontBackgroundCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(BACKGROUND_COLOR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      BACKGROUND_COLOR,
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
        BACKGROUND_COLOR,
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

import Command from "@ckeditor/ckeditor5-core/src/command";

const FONT_COLOR = "fontColor";
export class FontColorCommand extends Command {
  constructor(editor: any) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(FONT_COLOR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      FONT_COLOR,
    );
  }

  execute(paletteKey: any, color: any) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    const value = paletteKey || color;

    model.change((writer) => {
      if (selection.isCollapsed) {
        if (value) {
          writer.setSelectionAttribute(FONT_COLOR, value);
        } else {
          writer.removeSelectionAttribute(FONT_COLOR);
        }
      } else {
        const ranges = model.schema.getValidRanges(
          selection.getRanges(),
          FONT_COLOR,
        );

        for (const range of ranges) {
          if (value) {
            writer.setAttribute(FONT_COLOR, value, range);
          } else {
            writer.removeAttribute(FONT_COLOR, range);
          }
        }
      }
    });
  }
}

import CanvasflowEditor from "../../BaseEditor";
import Command from "@ckeditor/ckeditor5-core/src/command";
export const SMALL_CAPS_ATTR = "font-variant";
export const SMALL_CAPS_COMMAND = "setSmallCaps";

export class SmallCapsCommand extends Command {
  constructor(editor: CanvasflowEditor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(SMALL_CAPS_ATTR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      SMALL_CAPS_ATTR,
    );
  }

  execute(value: FontVartiantsValues) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        SMALL_CAPS_ATTR,
      );

      for (const range of ranges) {
        const attr: any = {};
        attr[SMALL_CAPS_ATTR] = value;
        writer.setAttributes(attr, range);
      }
    });
  }
}

type FontVartiantsValues = "small-caps";

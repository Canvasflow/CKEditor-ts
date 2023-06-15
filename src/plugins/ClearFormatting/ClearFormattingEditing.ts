import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { ClearFormattingCommands, CLEAR } from "./ClearFormattingCommands";

export class ClearFormattingEditing extends Plugin {
  static get pluginName() {
    return "ClearFormattingEditing";
  }

  constructor(editor: any) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: CLEAR,
      view: this.renderDowncastElement(),
      converterPriority: "high",
    });

    editor.commands.add(CLEAR, new ClearFormattingCommands(editor));
    editor.model.schema.extend("$text", { allowAttributes: CLEAR });
    editor.model.schema.setAttributeProperties(CLEAR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }

  private renderDowncastElement() {
    return (_: any, viewWriter: any) => {
      const attributes = { style: "" };
      return viewWriter.writer.createAttributeElement("span", attributes, {
        priority: 7,
      });
    };
  }
}

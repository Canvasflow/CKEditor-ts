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
      view: renderDowncastElement(),
    });

    editor.commands.add(CLEAR, new ClearFormattingCommands(editor));
    editor.model.schema.extend("$text", { allowAttributes: CLEAR });
    editor.model.schema.setAttributeProperties(CLEAR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement() {
  return (_: any, viewWriter: any) => {
    const attributes = { style: "color:red" };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

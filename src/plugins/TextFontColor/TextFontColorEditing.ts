import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { TextFontColorCommand, FONT_COLOR } from "./TextFontColorCommands";
import CanvasflowEditor from "../../BaseEditor";
export class TextFontColorEditing extends Plugin {
  static get pluginName() {
    return "TextFontColorEditing";
  }
  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: FONT_COLOR,
      view: renderDowncastElement(),
    });
    editor.commands.add(FONT_COLOR, new TextFontColorCommand(editor));
    // PREGUNTAR A CHUCK
    editor.model.schema.extend("$text", { allowAttributes: FONT_COLOR });
    editor.model.schema.setAttributeProperties(FONT_COLOR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}
function renderDowncastElement() {
  return (modelAttributeValue: any, viewWriter: any) => {
    const attributes = {
      style: `color:${modelAttributeValue}`,
    };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

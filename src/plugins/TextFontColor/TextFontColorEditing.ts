import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  TextFontColorCommand,
  ClearFontColorCommand,
  FONT_COLOR_ATTR,
  SET_FONT_COLOR_COMMAND,
  CLEAR_FONT_COLOR_COMMAND,
} from "./TextFontColorCommands";
import CanvasflowEditor from "../../BaseEditor";
export class TextFontColorEditing extends Plugin {
  static get pluginName() {
    return "TextFontColorEditing";
  }
  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: FONT_COLOR_ATTR,
      view: renderDowncastElement(),
    });
    editor.commands.add(
      SET_FONT_COLOR_COMMAND,
      new TextFontColorCommand(editor),
    );
    editor.commands.add(
      CLEAR_FONT_COLOR_COMMAND,
      new ClearFontColorCommand(editor),
    );
    editor.model.schema.extend("$text", { allowAttributes: FONT_COLOR_ATTR });
    editor.model.schema.setAttributeProperties(FONT_COLOR_ATTR, {
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

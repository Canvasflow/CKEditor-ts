import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  TextColorCommand,
  ClearFontColorCommand,
  TEXT_COLOR_ATTR,
  SET_TEXT_COLOR_COMMAND,
  CLEAR_TEXT_COLOR_COMMAND,
} from "./TextColorCommands";
import CanvasflowEditor from "../../BaseEditor";
export class TextColorEditing extends Plugin {
  static get pluginName() {
    return "TextFontColorEditing";
  }
  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: TEXT_COLOR_ATTR,
      view: renderDowncastElement(),
    });
    editor.commands.add(
      SET_TEXT_COLOR_COMMAND,
      new TextColorCommand(editor),
    );
    editor.commands.add(
      CLEAR_TEXT_COLOR_COMMAND,
      new ClearFontColorCommand(editor),
    );
    editor.model.schema.extend("$text", { allowAttributes: TEXT_COLOR_ATTR });
    editor.model.schema.setAttributeProperties(TEXT_COLOR_ATTR, {
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

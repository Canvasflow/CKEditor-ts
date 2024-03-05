import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  DarkColorCommand,
  ClearDarkColorCommand,
  DARK_COLOR_ATTR,
  SET_DARK_COLOR_COMMAND,
  CLEAR_DARK_COLOR_COMMAND,
} from "./DarkColorCommands";
import CanvasflowEditor from "../../BaseEditor";
export class DarkColorEditing extends Plugin {
  static get pluginName() {
    return "DarkColorEditing";
  }
  constructor(editor: CanvasflowEditor) {
    super(editor);

    editor.conversion.for("downcast").attributeToElement({
      model: DARK_COLOR_ATTR,
      view: renderDowncastElement(),
    });
    editor.commands.add(SET_DARK_COLOR_COMMAND, new DarkColorCommand(editor));
    editor.commands.add(
      CLEAR_DARK_COLOR_COMMAND,
      new ClearDarkColorCommand(editor),
    );
    editor.model.schema.extend("$text", { allowAttributes: DARK_COLOR_ATTR });
    editor.model.schema.setAttributeProperties(DARK_COLOR_ATTR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}
function renderDowncastElement() {
  return (modelAttributeValue: any, viewWriter: any) => {
    const attributes = { "dark-mode-color": modelAttributeValue };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  DarkBackgroundColorCommand,
  ClearDarkBackgroundColorCommand,
  DARK_BACKGROUND_COLOR_ATTR,
  CLEAR_DARK_BACKGROUND_COLOR_COMMAND,
  SET_DARK_BACKGROUND_COLOR_COMMAND,
} from "./DarkBackgroundColorCommands";
import CanvasflowEditor from "../../BaseEditor";
export class DarkBackgroundColorEditing extends Plugin {
  static get pluginName() {
    return "DarkBackgroundColorEditing";
  }
  constructor(editor: CanvasflowEditor) {
    super(editor);

    editor.conversion.for("downcast").attributeToElement({
      model: DARK_BACKGROUND_COLOR_ATTR,
      view: renderDowncastElement(),
    });
    editor.commands.add(
      SET_DARK_BACKGROUND_COLOR_COMMAND,
      new DarkBackgroundColorCommand(editor),
    );
    editor.commands.add(
      CLEAR_DARK_BACKGROUND_COLOR_COMMAND,
      new ClearDarkBackgroundColorCommand(editor),
    );
    editor.model.schema.extend("$text", {
      allowAttributes: DARK_BACKGROUND_COLOR_ATTR,
    });
    editor.model.schema.setAttributeProperties(DARK_BACKGROUND_COLOR_ATTR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}
function renderDowncastElement() {
  return (modelAttributeValue: any, viewWriter: any) => {
    const attributes = { "dark-mode-background": modelAttributeValue };
    console.log(attributes);
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

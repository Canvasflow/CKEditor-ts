import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  StrikethroughColorCommand,
  ClearStrikethroughColorCommand,
  TEXT_COLOR_ATTR,
  SET_TEXT_COLOR_COMMAND,
  CLEAR_TEXT_COLOR_COMMAND,
} from "./StrikethroughColorCommands";
import CanvasflowEditor from "../../BaseEditor";
export class StrikethroughColorEditing extends Plugin {
  static get pluginName() {
    return "StrikethroughFontColorEditing";
  }
  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: TEXT_COLOR_ATTR,
      view: renderDowncastElement(),
    });
    editor.commands.add(
      SET_TEXT_COLOR_COMMAND,
      new StrikethroughColorCommand(editor),
    );
    editor.commands.add(
      CLEAR_TEXT_COLOR_COMMAND,
      new ClearStrikethroughColorCommand(editor),
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

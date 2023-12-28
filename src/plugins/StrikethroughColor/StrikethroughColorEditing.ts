import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  StrikethroughColorCommand,
  ClearStrikethroughColorCommand,
  STRIKETHROUGH_COLOR_ATTR,
  SET_STRIKETHROUGH_TEXT_COLOR_COMMAND,
  CLEAR_STRIKETHROUGH_TEXT_COLOR_COMMAND,
} from "./StrikethroughColorCommands";
import CanvasflowEditor from "../../BaseEditor";
export class StrikethroughColorEditing extends Plugin {
  static get pluginName() {
    return "StrikethroughFontColorEditing";
  }
  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: STRIKETHROUGH_COLOR_ATTR,
      view: renderDowncastElement(),
    });
    editor.commands.add(
      SET_STRIKETHROUGH_TEXT_COLOR_COMMAND,
      new StrikethroughColorCommand(editor),
    );
    editor.commands.add(
      CLEAR_STRIKETHROUGH_TEXT_COLOR_COMMAND,
      new ClearStrikethroughColorCommand(editor),
    );

    editor.model.schema.extend("$text", {
      allowAttributes: STRIKETHROUGH_COLOR_ATTR,
    });
    editor.model.schema.setAttributeProperties(STRIKETHROUGH_COLOR_ATTR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}
function renderDowncastElement() {
  return (modelAttributeValue: any, viewWriter: any) => {
    const attributes = {
      style: `text-decoration-color:${modelAttributeValue}`,
    };
    return viewWriter.writer.createAttributeElement("s", attributes, {
      priority: 7,
    });
  };
}

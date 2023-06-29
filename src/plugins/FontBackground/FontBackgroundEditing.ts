import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  FontBackgroundCommand,
  BACKGROUND_COLOR_ATTR,
  ClearFontBackgroundCommand,
  CLEAR_BACKGROUND_COLOR_COMMAND,
  SET_BACKGROUND_COLOR_COMMAND,
} from "./FontBackgroundCommands";
import CanvasflowEditor from "../../BaseEditor";

export class FontBackgroundEditing extends Plugin {
  static get pluginName() {
    return "FontBackgroundEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: BACKGROUND_COLOR_ATTR,
      view: this.renderDowncastElement(),
    });

    editor.commands.add(
      SET_BACKGROUND_COLOR_COMMAND,
      new FontBackgroundCommand(editor),
    );
    editor.commands.add(
      CLEAR_BACKGROUND_COLOR_COMMAND,
      new ClearFontBackgroundCommand(editor),
    );
    editor.model.schema.extend("$text", {
      allowAttributes: BACKGROUND_COLOR_ATTR,
    });
    editor.model.schema.setAttributeProperties(BACKGROUND_COLOR_ATTR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }

  private renderDowncastElement() {
    return (modelAttributeValue: string, viewWriter: any) => {
      const attributes = {
        style: `background-color:${modelAttributeValue}`,
      };
      return viewWriter.writer.createAttributeElement("span", attributes, {
        priority: 7,
      });
    };
  }
}

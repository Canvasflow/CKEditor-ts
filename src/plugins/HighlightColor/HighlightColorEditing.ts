import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  HighlightColorCommand,
  HIGHLIGHT_COLOR_ATTR,
  ClearHighlightColorCommand,
  CLEAR_HIGHLIGHT_COLOR_COMMAND,
  SET_HIGHLIGHT_COLOR_COMMAND,
} from "./HighlightColorCommands";
import CanvasflowEditor from "../../BaseEditor";

export class FontBackgroundEditing extends Plugin {
  static get pluginName() {
    return "HighlightColorEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: HIGHLIGHT_COLOR_ATTR,
      view: this.renderDowncastElement(),
    });

    editor.commands.add(
      SET_HIGHLIGHT_COLOR_COMMAND,
      new HighlightColorCommand(editor),
    );
    editor.commands.add(
      CLEAR_HIGHLIGHT_COLOR_COMMAND,
      new ClearHighlightColorCommand(editor),
    );
    editor.model.schema.extend("$text", {
      allowAttributes: HIGHLIGHT_COLOR_ATTR,
    });
    editor.model.schema.setAttributeProperties(HIGHLIGHT_COLOR_ATTR, {
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

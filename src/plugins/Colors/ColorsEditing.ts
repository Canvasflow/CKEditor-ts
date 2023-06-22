import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { FontColorCommand, FONT_COLOR } from "./ColorCommands";
import CanvasflowEditor from "../../BaseEditor";

export class ColorEditing extends Plugin {
  static get pluginName() {
    return "ColorEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: FONT_COLOR,
      view: this.renderDowncastElement(),
    });
    editor.commands.add(FONT_COLOR, new FontColorCommand(editor));
    // PREGUNTAR A CHUCK
    editor.model.schema.extend("$text", { allowAttributes: FONT_COLOR });
    editor.model.schema.setAttributeProperties(FONT_COLOR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }

  private renderDowncastElement() {
    return (modelAttributeValue: any, viewWriter: any) => {
      const attributes = {
        style: `color:${modelAttributeValue}`,
      };
      return viewWriter.writer.createAttributeElement("span", attributes, {
        priority: 7,
      });
    };
  }
}

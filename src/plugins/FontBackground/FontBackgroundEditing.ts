import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  FontBackgroundCommand,
  BACKGROUND_COLOR,
} from "./FontBackgroundCommands";
import CanvasflowEditor from "../../BaseEditor";
export class FontBackgroundEditing extends Plugin {
  static get pluginName() {
    return "FontBackgroundEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: BACKGROUND_COLOR,
      view: this.renderDowncastElement(),
    });

    editor.commands.add(BACKGROUND_COLOR, new FontBackgroundCommand(editor));
    editor.model.schema.extend("$text", { allowAttributes: BACKGROUND_COLOR });
    editor.model.schema.setAttributeProperties(BACKGROUND_COLOR, {
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

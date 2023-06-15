import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  FontBackgroundCommand,
  BACKGROUND_COLOR,
} from "./FontBackgroundCommands";

export class FontBackgroundEditing extends Plugin {
  static get pluginName() {
    return "FontBackgroundEditing";
  }

  constructor(editor: any) {
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
    return (modelAttributeValue: any, viewWriter: any) => {
      const attributes = {
        style: `background-color:${modelAttributeValue}`,
      };
      return viewWriter.writer.createAttributeElement("span", attributes, {
        priority: 7,
      });
    };
  }
}

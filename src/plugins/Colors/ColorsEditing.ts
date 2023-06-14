import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { FontColorCommand, FONT_COLOR } from "./ColorCommands";
const THEME_COLOR_ATTRIBUTE = "theme-palette";

export class ColorEditing extends Plugin {
  static get pluginName() {
    return "ColorEditing";
  }

  constructor(editor: any) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: FONT_COLOR,
      view: renderDowncastElement(""),
    });

    editor.commands.add(FONT_COLOR, new FontColorCommand(editor));
    editor.model.schema.extend("$text", { allowAttributes: FONT_COLOR });
    editor.model.schema.setAttributeProperties(FONT_COLOR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement(themeColors: any) {
  return (modelAttributeValue: any, viewWriter: any) => {
    const attributes = {
      style: `color:${modelAttributeValue}`,
    };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

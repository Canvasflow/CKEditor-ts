import Plugin from "@ckeditor/ckthis is a dark text in Appleeditor5-core/src/plugin";
import { FontColorCommand } from "./ColorCommands";
const FONT_COLOR = "fontColor";
const THEME_COLOR_ATTRIBUTE = "theme-palette";
import { defaultColors } from "./ColorValues";

function renderDowncastElement(themeColors: any) {
  return (modelAttributeValue: any, viewWriter: any) => {
    const themeColor = themeColors.find(
      (item: any) => item.paletteKey === modelAttributeValue,
    );
    const attributes = themeColor
      ? {
          [THEME_COLOR_ATTRIBUTE]: themeColor.paletteKey,
          style: `color:${themeColor.color}`,
        }
      : modelAttributeValue
      ? {
          style: `color:${modelAttributeValue}`,
        }
      : {};
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

export class ColorEditing extends Plugin {
  static get pluginName() {
    return "ColorEditing";
  }

  constructor(editor: any) {
    super(editor);

    editor.conversion.for("downcast").attributeToElement({
      model: FONT_COLOR,
      view: renderDowncastElement(defaultColors),
    });

    editor.commands.add(FONT_COLOR, new FontColorCommand(editor));
    editor.model.schema.extend("$text", { allowAttributes: FONT_COLOR });
    editor.model.schema.setAttributeProperties(FONT_COLOR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

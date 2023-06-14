import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { CapitalizeCommands, CAPITALIZE } from "./CapitalizeCommands";

export class CapitalizeEditing extends Plugin {
  static get pluginName() {
    return "CapitalizeEditing";
  }

  constructor(editor: any) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: CAPITALIZE,
      view: renderDowncastElement(),
    });

    editor.commands.add(CAPITALIZE, new CapitalizeCommands(editor));
    editor.model.schema.extend("$text", { allowAttributes: CAPITALIZE });
    editor.model.schema.setAttributeProperties(CAPITALIZE, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement() {
  return (_: any, viewWriter: any) => {
    const attributes = {
      style: `text-transform:capitalize;`,
    };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

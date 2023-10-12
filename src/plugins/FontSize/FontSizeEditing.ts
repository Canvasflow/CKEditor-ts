import CanvasflowEditor from "../../BaseEditor";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  FontSizeCommand,
  TEXT_SIZE_ATTR,
  TEXT_SIZE_COMMAND,
} from "./FontSizeCommands";

export class FontSizeEditing extends Plugin {
  static get pluginName() {
    return "TextSizeEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);

    editor.conversion.for("downcast").attributeToElement({
      model: TEXT_SIZE_ATTR,
      view: renderDowncastElement(),
    });

    editor.commands.add(TEXT_SIZE_COMMAND, new FontSizeCommand(editor));
    editor.model.schema.extend("$text", { allowAttributes: TEXT_SIZE_ATTR });
    editor.model.schema.setAttributeProperties(TEXT_SIZE_ATTR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement() {
  return (modelAttributeValue: string, viewWriter: any) => {
    const attributes = { style: `font-size:${modelAttributeValue};` };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

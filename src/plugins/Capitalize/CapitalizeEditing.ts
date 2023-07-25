import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import CanvasflowEditor from "../../BaseEditor";
import {
  TextTransformCommand,
  TEXT_TRANSFORM_ATTR,
  TEXT_TRANSFORM_COMMAND,
} from "../../commands/TextTransform/TextTransformCommand";
export class CapitalizeEditing extends Plugin {
  static get pluginName() {
    return "CapitalizeEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: TEXT_TRANSFORM_ATTR,
      view: renderDowncastElement(),
    });

    editor.commands.add(
      TEXT_TRANSFORM_COMMAND,
      new TextTransformCommand(editor),
    );
    editor.model.schema.extend("$text", {
      allowAttributes: TEXT_TRANSFORM_ATTR,
    });
    editor.model.schema.setAttributeProperties(TEXT_TRANSFORM_ATTR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement() {
  return (modelAttributeValue: string, viewWriter: any) => {
    const attributes = {
      style: `text-transform:${modelAttributeValue};`,
    };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

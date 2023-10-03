import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import CanvasflowEditor from "../../BaseEditor";
import {
  SmallCapsCommand,
  SMALL_CAPS_ATTR,
  SMALL_CAPS_COMMAND,
} from "./SmallCapsCommand";
export class SmallCapsEditing extends Plugin {
  static get pluginName() {
    return "SmallCapsEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: SMALL_CAPS_ATTR,
      view: renderDowncastElement(),
    });

    editor.commands.add(SMALL_CAPS_COMMAND, new SmallCapsCommand(editor));
    editor.model.schema.extend("$text", {
      allowAttributes: SMALL_CAPS_ATTR,
    });
    editor.model.schema.setAttributeProperties(SMALL_CAPS_ATTR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement() {
  return (modelAttributeValue: string, viewWriter: any) => {
    const attributes = {
      style: `font-variant:${modelAttributeValue};`,
    };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

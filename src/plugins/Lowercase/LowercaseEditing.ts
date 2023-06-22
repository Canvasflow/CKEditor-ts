import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { LowercaseCommands, LOWERCASE } from "./LowercaseCommands";
import CanvasflowEditor from "../../BaseEditor";
export class LowercaseEditing extends Plugin {
  static get pluginName() {
    return "LowercaseEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: LOWERCASE,
      view: renderDowncastElement(),
    });

    editor.commands.add(LOWERCASE, new LowercaseCommands(editor));
    editor.model.schema.extend("$text", { allowAttributes: LOWERCASE });
    editor.model.schema.setAttributeProperties(LOWERCASE, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement() {
  return (_: any, viewWriter: any) => {
    const attributes = {
      style: `text-transform:lowercase;`,
    };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

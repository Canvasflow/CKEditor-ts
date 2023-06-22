import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { UppercaseCommands, UPPERCASE } from "./UppercaseCommands";
import CanvasflowEditor from "../../BaseEditor";
export class UppercaseEditing extends Plugin {
  static get pluginName() {
    return "UppercaseEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: UPPERCASE,
      view: renderDowncastElement(),
    });

    editor.commands.add(UPPERCASE, new UppercaseCommands(editor));
    editor.model.schema.extend("$text", { allowAttributes: UPPERCASE });
    editor.model.schema.setAttributeProperties(UPPERCASE, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement() {
  return (_: any, viewWriter: any) => {
    const attributes = {
      style: `text-transform:uppercase;`,
    };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

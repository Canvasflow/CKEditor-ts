import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { UppercaseCommands } from "./UppercaseCommands";

export class UppercaseEditing extends Plugin {
  static get pluginName() {
    return "UppercaseEditing";
  }

  constructor(editor: any) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: "uppercase",
      view: renderDowncastElement(),
    });

    editor.commands.add("uppercase", new UppercaseCommands(editor));
    editor.model.schema.extend("$text", { allowAttributes: "uppercase" });
    editor.model.schema.setAttributeProperties("uppercase", {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement() {
  return (viewWriter: any) => {
    const attributes = {
      style: `text-transform:uppercase;`,
    };

    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

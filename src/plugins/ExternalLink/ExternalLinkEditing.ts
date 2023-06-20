import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { ExternalLinkCommand } from "./ExternalLinkCommands";

export class ExternalLinkEditing extends Plugin {
  static get pluginName() {
    return "ExternalLinkEditing";
  }

  constructor(editor: any) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: "Link",
      view: renderDowncastElement(),
    });

    editor.commands.add("Link", new ExternalLinkCommand(editor));
    editor.model.schema.extend("$text", { allowAttributes: "Link" });
    editor.model.schema.setAttributeProperties("Link", {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement() {
  return (viewWriter: any) => {
    const attributes = { href: "" };
    return viewWriter.writer.createAttributeElement("a", attributes, {
      priority: 7,
    });
  };
}

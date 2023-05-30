import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { PageLinkCommand } from "./PageLinkCommands";

function renderDowncastElement() {
  console.log("downcast was called");
  return (modelAttributeValue: any, viewWriter: any) => {
    const attributes = { href: "google.com" };
    return viewWriter.writer.createAttributeElement("a", attributes, {
      priority: 7,
    });
  };
}

export class PageLinkEditing extends Plugin {
  static get pluginName() {
    return "PageLinkEditing";
  }

  constructor(editor: any) {
    super(editor);
    console.log("tried to update the value");
    // editor.conversion.for("downcast").attributeToElement({
    //   model: "PageLink",
    //   view: renderDowncastElement(),
    // });

    editor.commands.add("PageLink", new PageLinkCommand(editor));

    // editor.model.schema.extend("$text", { allowAttributes: FONT_COLOR });
    // editor.model.schema.setAttributeProperties(FONT_COLOR, {
    //   isFormatting: true,
    //   copyOnEnter: true,
    // });
  }
}

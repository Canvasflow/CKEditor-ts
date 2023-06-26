import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { TextFontColorCommand } from "./TextFontColorCommands";
import CanvasflowEditor from "../../BaseEditor";
export class TextFontColorEditing extends Plugin {
  static get pluginName() {
    return "TextFontColorEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: "PageLink",
      view: renderDowncastElement(),
    });

    editor.commands.add("PageLink", new TextFontColorCommand(editor));
    editor.model.schema.extend("$text", { allowAttributes: "PageLink" });
    editor.model.schema.setAttributeProperties("PageLink", {
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

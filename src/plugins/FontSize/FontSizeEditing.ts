import CanvasflowEditor from "../../BaseEditor";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { FontSizeCommand } from "./FontSizeCommands";

export class FontSizeEditing extends Plugin {
  static get pluginName() {
    return "TextSizeEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: "textSize",
      view: renderDowncastElement(),
    });

    editor.commands.add("textSize", new FontSizeCommand(editor));
    editor.model.schema.extend("$text", { allowAttributes: "textSize" });
    editor.model.schema.setAttributeProperties("textSize", {
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

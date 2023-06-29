import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { TextSizeCommand } from "./TextSizeCommands";
import CanvasflowEditor from "../../BaseEditor";
export class TextSizeEditing extends Plugin {
  static get pluginName() {
    return "TextSizeEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: "textSize",
      view: renderDowncastElement(),
    });

    editor.commands.add("textSize", new TextSizeCommand(editor));
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

import CanvasflowEditor from "../../BaseEditor";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  TITLE_EDITOR_ATTR,
  TITLE_EDITOR_COMMAND,
  TITLE_EDITOR_CLEAR,
  TitleEditorCommand,
  ClearTitleCommand,
} from "./TitleEditorCommands";

export class TitleEditorEditing extends Plugin {
  static get pluginName() {
    return "TitleEditorEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: TITLE_EDITOR_ATTR,
      view: renderDowncastElement(),
    });

    editor.commands.add(TITLE_EDITOR_COMMAND, new TitleEditorCommand(editor));
    editor.commands.add(TITLE_EDITOR_CLEAR, new ClearTitleCommand(editor));
    editor.model.schema.extend("$text", { allowAttributes: TITLE_EDITOR_ATTR });
    editor.model.schema.setAttributeProperties(TITLE_EDITOR_ATTR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement() {
  return (modelAttributeValue: any, viewWriter: any) => {
    const attributes = { title: modelAttributeValue };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

import CanvasflowEditor from "../../BaseEditor";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  TITLE_EDITOR_ATTR,
  TITLE_EDITOR_COMMAND,
  TITLE_EDITOR_CLEAR,
  TitleEditorCommand,
  ClearTitleCommand,
} from "./TitleEditorCommands";
import { uid } from "ckeditor5/src/utils";

const titles: Array<string> = [];

export class TitleEditorEditing extends Plugin {
  static get pluginName() {
    return "TitleEditorEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: TITLE_EDITOR_ATTR,
      view: (item: any) => {
        // renderDowncastUElement(),
      },
    });

    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "u",
      },
      model: {
        key: TITLE_EDITOR_ATTR,
        value: (viewItem: any) => {
          const attributes = ToAttribute(viewItem, {
            title: viewItem.getAttribute("title"),
          });

          if (attributes.title) {
            return attributes.title;
          }
          return "";
        },
      },
      converterPriority: "high",
    });

    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "span",
      },
      model: {
        key: TITLE_EDITOR_ATTR,
        value: (viewItem: any) => {
          if (viewItem.getAttribute("title")) {
            const attributes = ToAttribute(viewItem, {
              title: viewItem.getAttribute("title"),
            });

            if (attributes.title) {
              return attributes.title;
            }
          }
        },
      },
      converterPriority: "high",
    });

    editor.conversion.for("downcast").attributeToElement({
      model: TITLE_EDITOR_ATTR,
      view: (modelAttributeValue, { writer }) => {
        if (
          modelAttributeValue &&
          !titles.includes(modelAttributeValue) &&
          modelAttributeValue.includes(":")
        ) {
          console.log("inside downcast", modelAttributeValue);
          titles.push(modelAttributeValue);
          if (modelAttributeValue && modelAttributeValue.title) {
            let downcastValues: any = {
              title: modelAttributeValue["title"]
                ? modelAttributeValue["title"]
                : modelAttributeValue,
            };
            return writer.createAttributeElement("sup", downcastValues);
          } else {
            return writer.createAttributeElement("u", {
              title: modelAttributeValue,
            });
          }
        } else {
          if (modelAttributeValue && modelAttributeValue.title) {
            let downcastValues: any = {
              title: modelAttributeValue["title"]
                ? modelAttributeValue["title"]
                : modelAttributeValue,
            };
            return writer.createAttributeElement("sup", downcastValues);
          } else {
            return writer.createAttributeElement("sup", {
              title: modelAttributeValue,
            });
          }
        }
      },
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

function renderDowncastSupElement() {
  return (modelAttributeValue: any, viewWriter: any) => {
    console.log("sup element called");
    const attributes = { title: modelAttributeValue };
    return viewWriter.writer.createAttributeElement("sup", attributes, {
      priority: 7,
    });
  };
}

function renderDowncastUElement() {
  return (modelAttributeValue: any, viewWriter: any) => {
    console.log("u element called");
    const attributes = { title: modelAttributeValue };
    return viewWriter.writer.createAttributeElement("u", attributes, {
      priority: 7,
    });
  };
}

function ToAttribute(viewElementOrGlossary: any, data: any) {
  const textNode = viewElementOrGlossary.getChild(0);
  if (!textNode) {
    return;
  }
  return AddPluginAttributes({}, data);
}

function AddPluginAttributes(baseGlossaryData: any, data: any) {
  return Object.assign({ uid: uid() }, baseGlossaryData, data || {});
}

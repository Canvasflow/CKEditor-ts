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

    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "sup",
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
      // view: (modelAttributeValue, { writer }) => {
      //   if (!modelAttributeValue) {
      //     return;
      //   }

      //   let downcastValues: any = {
      //     "dark-mode-color": modelAttributeValue["dark-mode-color"]
      //       ? modelAttributeValue["dark-mode-color"]
      //       : modelAttributeValue,
      //   };

      //   if (modelAttributeValue["dark-mode-background"]) {
      //     downcastValues["dark-mode-background"] =
      //       modelAttributeValue["dark-mode-background"];
      //   }

      //   if (modelAttributeValue["data-anf-dark-mode"]) {
      //     downcastValues["data-anf-dark-mode"] =
      //       modelAttributeValue["data-anf-dark-mode"];
      //   }

      //   return writer.createAttributeElement("span", downcastValues);
      // },
      view: (modelAttributeValue, { writer }) => {
        console.log("view item", modelAttributeValue);
        if (modelAttributeValue && modelAttributeValue.title) {
          let downcastValues: any = {
            title: modelAttributeValue["title"]
              ? modelAttributeValue["title"]
              : modelAttributeValue,
          };
          return writer.createAttributeElement("span", downcastValues);
        } else {
          return writer.createAttributeElement("span", {
            title: modelAttributeValue,
          });
        }
        // else {
        //   console.log("RENDER DOWNCAST");
        //   renderDowncastElement();
        // }
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

function renderDowncastElement() {
  return (modelAttributeValue: any, viewWriter: any) => {
    const attributes = { title: modelAttributeValue };
    return viewWriter.writer.createAttributeElement("span", attributes, {
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

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  DarkColorCommand,
  ClearDarkColorCommand,
  DARK_COLOR_ATTR,
  SET_DARK_COLOR_COMMAND,
  CLEAR_DARK_COLOR_COMMAND,
} from "./DarkColorCommands";
import CanvasflowEditor from "../../BaseEditor";
import { uid } from "ckeditor5/src/utils";

export class DarkColorEditing extends Plugin {
  static get pluginName() {
    return "DarkColorEditing";
  }
  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.commands.add(SET_DARK_COLOR_COMMAND, new DarkColorCommand(editor));
    editor.commands.add(
      CLEAR_DARK_COLOR_COMMAND,
      new ClearDarkColorCommand(editor),
    );
    editor.model.schema.extend("$text", { allowAttributes: [DARK_COLOR_ATTR] });

    editor.model.schema.setAttributeProperties(DARK_COLOR_ATTR, {
      isFormatting: true,
      copyOnEnter: true,
    });

    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "span",
        attributes: {
          "dark-mode-color": true,
        },
      },
      model: {
        key: DARK_COLOR_ATTR,
        value: (viewItem: any) => {
          const attributes = ToAttribute(viewItem, {
            "data-anf-dark-mode": viewItem.getAttribute("data-anf-dark-mode"),
            "dark-mode-color": viewItem.getAttribute("dark-mode-color"),
            "dark-mode-background": viewItem.getAttribute(
              "dark-mode-background",
            ),
          });

          Object.keys(attributes).forEach((key) => {
            if (attributes[key] === undefined) {
              delete attributes[key];
            }
          });
          console.log("DARK COLOR ATTRS", attributes);
          return attributes;
        },
      },
      converterPriority: "high",
    });

    editor.conversion.for("downcast").attributeToElement({
      model: DARK_COLOR_ATTR,
      view: (modelAttributeValue, { writer }) => {
        if (!modelAttributeValue) {
          return;
        }

        let downcastValues: any = {
          "dark-mode-color": modelAttributeValue["dark-mode-color"]
            ? modelAttributeValue["dark-mode-color"]
            : modelAttributeValue,
        };

        if (modelAttributeValue["dark-mode-background"]) {
          downcastValues["dark-mode-background"] =
            modelAttributeValue["dark-mode-background"];
        }

        if (modelAttributeValue["data-anf-dark-mode"]) {
          downcastValues["data-anf-dark-mode"] =
            modelAttributeValue["data-anf-dark-mode"];
        }

        return writer.createAttributeElement("span", downcastValues);
      },
      converterPriority: "high",
    });
  }
}

function AddPluginAttributes(baseGlossaryData: any, data: any) {
  return Object.assign({ uid: uid() }, baseGlossaryData, data || {});
}

function ToAttribute(viewElementOrGlossary: any, data: any) {
  const textNode = viewElementOrGlossary.getChild(0);
  if (!textNode) {
    return;
  }

  return AddPluginAttributes({}, data);
}

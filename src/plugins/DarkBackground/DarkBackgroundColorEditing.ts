import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  DarkBackgroundColorCommand,
  ClearDarkBackgroundColorCommand,
  DARK_BACKGROUND_COLOR_ATTR,
  CLEAR_DARK_BACKGROUND_COLOR_COMMAND,
  SET_DARK_BACKGROUND_COLOR_COMMAND,
} from "./DarkBackgroundColorCommands";
import CanvasflowEditor from "../../BaseEditor";
import { uid } from "ckeditor5/src/utils";

export class DarkBackgroundColorEditing extends Plugin {
  static get pluginName() {
    return "DarkBackgroundColorEditing";
  }
  constructor(editor: CanvasflowEditor) {
    super(editor);

    editor.model.schema.extend("$text", {
      allowAttributes: [DARK_BACKGROUND_COLOR_ATTR],
    });

    editor.model.schema.setAttributeProperties(DARK_BACKGROUND_COLOR_ATTR, {
      isFormatting: true,
      copyOnEnter: true,
    });

    editor.commands.add(
      SET_DARK_BACKGROUND_COLOR_COMMAND,
      new DarkBackgroundColorCommand(editor),
    );
    editor.commands.add(
      CLEAR_DARK_BACKGROUND_COLOR_COMMAND,
      new ClearDarkBackgroundColorCommand(editor),
    );

    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "span",
        attributes: {
          "dark-mode-background": true,
        },
      },
      model: {
        key: DARK_BACKGROUND_COLOR_ATTR,
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
          return attributes;
        },
      },
      converterPriority: "high",
    });

    editor.conversion.for("downcast").attributeToElement({
      model: DARK_BACKGROUND_COLOR_ATTR,
      view: (modelAttributeValue, { writer }) => {
        if (!modelAttributeValue) {
          return;
        }

        let downcastValues: any = {
          "dark-mode-background": modelAttributeValue["dark-mode-background"]
            ? modelAttributeValue["dark-mode-background"]
            : modelAttributeValue,
        };

        if (modelAttributeValue["dark-mode-color"]) {
          downcastValues["dark-mode-color"] =
            modelAttributeValue["dark-mode-color"];
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

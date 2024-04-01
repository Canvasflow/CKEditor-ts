import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "ckeditor5/src/core";
import { getIcon } from "../../icons/icons";
import { uid } from "ckeditor5/src/utils";

export class DarkMode extends Plugin {
  init() {
    const editor = this.editor;

    editor.model.schema.extend("$text", {
      allowAttributes: ["data-anf-dark-mode"],
    });

    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "span",
        attributes: {
          "data-anf-dark-mode": true,
          //"dark-mode-color": true,
          // "dark-mode-background": true,
        },
      },
      model: {
        key: "data-anf-dark-mode",
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
          console.log(attributes);
          return attributes;
        },
      },
      converterPriority: "high",
    });

    editor.conversion.for("downcast").attributeToElement({
      model: "data-anf-dark-mode",
      view: (modelAttributeValue, { writer }) => {
        if (!modelAttributeValue) {
          return;
        }

        let downcastValues: any = { "data-anf-dark-mode": true };

        if (modelAttributeValue["dark-mode-color"]) {
          downcastValues["dark-mode-color"] =
            modelAttributeValue["dark-mode-color"];
        }

        if (modelAttributeValue["dark-mode-background"]) {
          downcastValues["dark-mode-background"] =
            modelAttributeValue["dark-mode-background"];
        }

        return writer.createAttributeElement("span", downcastValues);
      },
      converterPriority: "high",
    });

    editor.ui.componentFactory.add("dark-mode", () => {
      const button = new ButtonView();
      button.set({
        tooltip: "Apple dark mode",
        withText: false,
        icon: getIcon("darkmode"),
      });

      button.on("execute", () => {
        editor.model.change(async (writer) => {
          const selection = editor.model.document.selection;
          if (!selection) {
            return;
          }
          const range = selection.getFirstRange();
          if (!range) {
            return;
          }

          var position = selection.getFirstPosition();
          if (position) {
            writer.setAttributes({ "data-anf-dark-mode": "true" }, range);
          }
          // confirmar si ya tiene el atributo y quitarlo si esta encendido
        });
      });

      return button;
    });
  }
}

export function AddPluginAttributes(baseGlossaryData: any, data: any) {
  return Object.assign({ uid: uid() }, baseGlossaryData, data || {});
}

export function ToAttribute(viewElementOrGlossary: any, data: any) {
  const textNode = viewElementOrGlossary.getChild(0);
  if (!textNode) {
    return;
  }

  return AddPluginAttributes({}, data);
}

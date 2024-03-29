import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "ckeditor5/src/core";
import { getIcon } from "../../icons/icons";

export class DarkMode extends Plugin {
  init() {
    const editor = this.editor;

    editor.model.schema.extend("$text", {
      allowAttributes: "data-anf-dark-mode",
    });

    editor.conversion.for("upcast").attributeToAttribute({
      view: "span",
      model: "data-anf-dark-mode",
    });

    editor.conversion.for("downcast").attributeToElement({
      model: "data-anf-dark-mode",
      view: renderDowncastElement(),
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

function renderDowncastElement() {
  return (_: string, viewWriter: any) => {
    const attributes = { "data-anf-dark-mode": true };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

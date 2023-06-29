import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "ckeditor5/src/core";
import icon from "../../assets/icons/darkMode.svg?raw";

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
      view: (_modelElement, { writer }) => {
        return writer.createAttributeElement("span", {
          "data-anf-dark-mode": "true",
        });
      },
    });

    editor.ui.componentFactory.add("dark-mode", () => {
      const button = new ButtonView();
      button.set({
        tooltip: "Apple dark mode",
        withText: false,
        icon,
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
          let value = "";
          for (const item of range.getItems()) {
            const proxy = item as any;
            value = proxy.data;
            writer.remove(item);
          }

          var position = selection.getFirstPosition();
          if (position) {
            console.log("HERE");
            writer.insertText(
              value,
              { "data-anf-dark-mode": "true" },
              position,
            );
          }
        });
      });

      return button;
    });
  }
}

import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "ckeditor5/src/core";
import icon from "./RemoveFormattingIcon.svg?raw";
export class RemoveFormatting extends Plugin {
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

    editor.ui.componentFactory.add("remove-formatting", () => {
      const button = new ButtonView();
      button.set({
        tooltip: "Remove styling",
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
            writer.insertText(value, position);
          }
        });
      });

      return button;
    });
  }
}

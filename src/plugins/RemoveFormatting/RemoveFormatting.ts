import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "ckeditor5/src/core";
import pencil from "@ckeditor/ckeditor5-core/theme/icons/pencil.svg";

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
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 6h5m5 0h-5m0 0-2 6m-2 6 .667-2M5 5l14 14"/></svg>`,
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

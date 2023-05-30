import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "ckeditor5/src/core";
import pencil from "@ckeditor/ckeditor5-core/theme/icons/pencil.svg";

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
      view: ({ writer }) => {
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
        icon: pencil,
      });

      button.on("execute", () => {
        /* this is working */
        // editor.model.change(async (writer) => {
        //   //  var selection = editor.model.document.selection;
        //   // var position = selection.getFirstPosition();
        //   const selection = editor.model.document.selection;
        //   const range = selection.getFirstRange();
        //   var position = selection.getFirstPosition();
        //   if (position) {
        //     writer.insertText(
        //       "this is a dark text in Apple",
        //       { "data-anf-dark-mode": "true" },
        //       position,
        //     );
        //   }
        // });

        editor.model.change(async (writer) => {
          const selection = editor.model.document.selection;
          const range = selection.getFirstRange();
          if (range) {
            let value = "";
            for (const item of range.getItems()) {
              value = item.data;
              writer.remove(item);
            }
            const selection = editor.model.document.selection;

            var position = selection.getFirstPosition();
            if (position) {
              writer.insertText(
                value,
                { "data-anf-dark-mode": "true" },
                position,
              );
            }
          }
        });
      });

      return button;
    });
  }
}

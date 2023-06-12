import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "ckeditor5/src/core";
import icon from "./DarkModeIcon.svg?raw";

export class DarkMode extends Plugin {
  init() {
    const editor = this.editor;

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

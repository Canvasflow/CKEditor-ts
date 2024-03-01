import CanvasflowEditor from "../../BaseEditor";
import { Plugin } from "@ckeditor/ckeditor5-core";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { TitleCaseEditing } from "./TitleCaseEditing";

export class TitleCase extends Plugin {
  static viewName = "cf-titlecase";
  declare editor: CanvasflowEditor;

  init() {
    this.editor.ui.componentFactory.add(TitleCase.viewName, this.renderView);
  }

  renderView = () => {
    const button = new ButtonView();
    button.label = "Title Case";
    button.tooltip = false;
    button.withText = true;
    const excludeWords =
      /(^|\b(?!(and?|at?|for?|the|to|but|by|a|and|as|if|nor|so|yet|in|of|off|on|up)\b))\w+/g;

    this.listenTo(button, "execute", () => {
      this.editor.model.change(async (writer) => {
        const selection = this.editor.model.document.selection;
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
          const attrs = item.getAttributes();
          if (value) {
            const formatted = value
              .toLowerCase()
              .replace(excludeWords, (s) => s[0].toUpperCase() + s.slice(1));
            // proxy.data = formatted;
            var position = selection.getFirstPosition();
            writer.remove(item);
            if (position) {
              writer.insertText(formatted, attrs, position);
            }
          }
        }
        var position = selection.getFirstPosition();
      });
    });
    return button;
  };

  static get requires() {
    return [TitleCaseEditing];
  }
}

import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "ckeditor5/src/core";
import pencil from "@ckeditor/ckeditor5-core/theme/icons/pencil.svg";

export class Uppercase extends Plugin {
  init() {
    const editor = this.editor;

    editor.conversion.for("downcast").attributeToElement({
      model: "style",
      view: (_modelElement, { writer }, data) => {
        console.log(data);
        return writer.createAttributeElement("span", {
          style: "color: blue",
        });
      },
    });

    editor.ui.componentFactory.add("Uppercase", () => {
      const button = new ButtonView();
      button.set({
        tooltip: "Uppercase",
        withText: false,
        icon: pencil,
      });

      button.on("execute", () => {
        editor.model.change(async (writer) => {
          // ** this is working fine ***
          const selection = editor.model.document.selection;
          if (!selection) {
            return;
          }
          const range = selection.getFirstRange();
          if (!range) {
            return;
          }
          let value = "";
          let properties = undefined;
          for (const item of range.getItems()) {
            const proxy = item as any;
            value = proxy.data;

            properties = item.getAttributes();
            writer.remove(item);
          }
          var position = selection.getFirstPosition();
          if (position) {
            const attributes = [];
            var props = Array.from(properties);
            for (const prop of props) {
              attributes.push({ [prop[0]]: prop[1] });
            }
            writer.insertText(value.toUpperCase(), { style: "" }, position);
          }

          //   const selection = editor.model.document.selection;
          //   if (!selection) {
          //     return;
          //   }
          //   const range = selection.getFirstRange();
          //   if (!range) {
          //     return;
          //   }
          //   console.log(range);
          //   let value = "";
          //   for (const item of range.getItems()) {
          //     if (item) {
          //       const proxy = item as any;
          //       value = proxy.data;
          //       var position = selection.getFirstPosition();
          //       writer.insertText(value.toUpperCase(), position);
          //       console.log(item.getAttributes());
          //     }
          //   }
        });
      });

      return button;
    });
  }
}

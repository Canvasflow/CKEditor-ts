import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "ckeditor5/src/core";

export class Lowercase extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("Lowercase", () => {
      const button = new ButtonView();
      button.set({
        tooltip: "Lowercase",
        withText: false,
        icon: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.69899 5.20703C2.05823 5.20703 0.809204 6.68569 0.809204 8.60972C0.809204 10.6337 2.15823 12.0124 3.69899 12.0124C4.52126 12.0124 5.37402 11.6693 5.9539 11.0223V11.53C5.9539 11.7785 6.15537 11.98 6.4039 11.98C6.65243 11.98 6.8539 11.7785 6.8539 11.53V5.72001C6.8539 5.47149 6.65243 5.27001 6.4039 5.27001C6.15537 5.27001 5.9539 5.47149 5.9539 5.72001V6.22269C5.40506 5.60075 4.59218 5.20703 3.69899 5.20703ZM5.9539 9.799V7.30117C5.56339 6.58064 4.74118 6.05757 3.8868 6.05757C2.9089 6.05757 1.83508 6.96581 1.83508 8.60955C1.83508 10.1533 2.80889 11.1615 3.8868 11.1615C4.76984 11.1615 5.57141 10.4957 5.9539 9.799ZM10.799 5.20703C9.15823 5.20703 7.9092 6.68569 7.9092 8.60972C7.9092 10.6337 9.25823 12.0124 10.799 12.0124C11.6215 12.0124 12.4744 11.6692 13.0543 11.0218V11.53C13.0543 11.7785 13.2558 11.98 13.5043 11.98C13.7529 11.98 13.9543 11.7785 13.9543 11.53V5.72C13.9543 5.47147 13.7529 5.27 13.5043 5.27C13.2558 5.27 13.0543 5.47147 13.0543 5.72V6.22318C12.5055 5.60095 11.6924 5.20703 10.799 5.20703ZM13.0543 9.79822V7.30196C12.664 6.58102 11.8415 6.05757 10.9868 6.05757C10.0089 6.05757 8.93508 6.96581 8.93508 8.60955C8.93508 10.1533 9.90889 11.1615 10.9868 11.1615C11.8702 11.1615 12.672 10.4952 13.0543 9.79822Z" fill="currentColor" /> </svg>`,
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
          // let properties = undefined;
          for (const item of range.getItems()) {
            const proxy = item as any;
            value = proxy.data;

            // properties = item.getAttributes();
            writer.remove(item);
          }
          var position = selection.getFirstPosition();
          if (position) {
            // const attributes = [];
            // var props = Array.from(properties);
            // for (const prop of props) {
            //   attributes.push({ [prop[0]]: prop[1] });
            // }
            writer.insertText(
              value,
              { style: "text-transform: lowercase;" },
              position,
            );
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

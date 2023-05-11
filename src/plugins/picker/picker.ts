import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "ckeditor5/src/core";

export class Picker extends Plugin {
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("picker", () => {
      const button = new ButtonView();
      button.set({
        tooltip: "Color Picker",
        withText: false,
        icon: `<svg style="color: white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.5566 8.62411L14.1753 10.8096L8.69444 19.8846C8.37003 20.4218 7.76997 20.7295 7.14444 20.6796V20.6796C6.36571 20.6174 5.73623 20.0197 5.63385 19.2452L5.50014 18.2336C5.41328 17.5765 5.55264 16.9094 5.8953 16.3421L10.5566 8.62411Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"></path> <rect x="9.84003" y="5.72208" width="8.45496" height="2.11374" rx="1.05687" transform="rotate(31.1299 9.84003 5.72208)" fill="#333333" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect> <path d="M13.2886 4.10089C13.8921 3.10161 15.1914 2.78078 16.1907 3.3843V3.3843C17.19 3.98781 17.5108 5.28713 16.9073 6.28641L14.7217 9.90512L11.103 7.7196L13.2886 4.10089Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"></path> </svg>`,
      });

      button.on("execute", () => {
        console.log("this should open a view");
      });

      return button;
    });
  }
}

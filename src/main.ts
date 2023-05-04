import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { BalloonEditor } from "@ckeditor/ckeditor5-editor-balloon";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
} from "@ckeditor/ckeditor5-basic-styles";

import { List } from "@ckeditor/ckeditor5-list";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Font } from "@ckeditor/ckeditor5-font";
import { Alignment } from "@ckeditor/ckeditor5-alignment";

import { Link } from "@ckeditor/ckeditor5-link";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "ckeditor5/src/core";

import {
  SpecialCharacters,
  SpecialCharactersEssentials,
} from "@ckeditor/ckeditor5-special-characters";
class Timestamp extends Plugin {
  init() {
    const editor = this.editor;
    // The button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add("timestamp", () => {
      // The button will be an instance of ButtonView.
      const button = new ButtonView();

      button.set({
        label: "HERE",
        withText: false,
        icon: `<svg viewBox="0 0 68 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M43.71 11.025a11.508 11.508 0 0 0-1.213 5.159c0 6.42 5.244 11.625 11.713 11.625.083 0 .167 0 .25-.002v16.282a5.464 5.464 0 0 1-2.756 4.739L30.986 60.7a5.548 5.548 0 0 1-5.512 0L4.756 48.828A5.464 5.464 0 0 1 2 44.089V20.344c0-1.955 1.05-3.76 2.756-4.738L25.474 3.733a5.548 5.548 0 0 1 5.512 0l12.724 7.292z" fill="#FFF"/><path d="M45.684 8.79a12.604 12.604 0 0 0-1.329 5.65c0 7.032 5.744 12.733 12.829 12.733.091 0 .183-.001.274-.003v17.834a5.987 5.987 0 0 1-3.019 5.19L31.747 63.196a6.076 6.076 0 0 1-6.037 0L3.02 50.193A5.984 5.984 0 0 1 0 45.003V18.997c0-2.14 1.15-4.119 3.019-5.19L25.71.804a6.076 6.076 0 0 1 6.037 0L45.684 8.79zm-29.44 11.89c-.834 0-1.51.671-1.51 1.498v.715c0 .828.676 1.498 1.51 1.498h25.489c.833 0 1.51-.67 1.51-1.498v-.715c0-.827-.677-1.498-1.51-1.498h-25.49.001zm0 9.227c-.834 0-1.51.671-1.51 1.498v.715c0 .828.676 1.498 1.51 1.498h18.479c.833 0 1.509-.67 1.509-1.498v-.715c0-.827-.676-1.498-1.51-1.498H16.244zm0 9.227c-.834 0-1.51.671-1.51 1.498v.715c0 .828.676 1.498 1.51 1.498h25.489c.833 0 1.51-.67 1.51-1.498v-.715c0-.827-.677-1.498-1.51-1.498h-25.49.001zm41.191-14.459c-5.835 0-10.565-4.695-10.565-10.486 0-5.792 4.73-10.487 10.565-10.487C63.27 3.703 68 8.398 68 14.19c0 5.791-4.73 10.486-10.565 10.486v-.001z" fill="#1EBC61" fill-rule="nonzero"/><path d="M60.857 15.995c0-.467-.084-.875-.251-1.225a2.547 2.547 0 0 0-.686-.88 2.888 2.888 0 0 0-1.026-.531 4.418 4.418 0 0 0-1.259-.175c-.134 0-.283.006-.447.018-.15.01-.3.034-.446.07l.075-1.4h3.587v-1.8h-5.462l-.214 5.06c.319-.116.682-.21 1.089-.28.406-.071.77-.107 1.088-.107.218 0 .437.021.655.063.218.041.413.114.585.218s.313.244.422.419c.109.175.163.391.163.65 0 .424-.132.745-.396.961a1.434 1.434 0 0 1-.938.325c-.352 0-.656-.1-.912-.3-.256-.2-.43-.453-.523-.762l-1.925.588c.1.35.258.664.472.943.214.279.47.514.767.706.298.191.63.339.995.443.365.104.749.156 1.151.156.437 0 .86-.064 1.272-.193.41-.13.778-.323 1.1-.581a2.8 2.8 0 0 0 .775-.981c.193-.396.29-.864.29-1.405h-.001z" fill="#FFF" fill-rule="nonzero"/></g></svg>`,
      });

      button.on("execute", () => {
        const now = new Date();

        // Change the model using the model writer.
        editor.model.change((writer) => {
          // Insert the text at the user's current position.
          editor.model.insertContent(writer.createText(now.toString()));
        });
      });

      return button;
    });
  }
}

BalloonEditor.create(document.querySelector("#editor") as HTMLElement, {
  plugins: [
    Essentials,
    Bold,
    Italic,
    List,
    Paragraph,
    Underline,
    Strikethrough,
    Subscript,
    Superscript,
    Font,
    Alignment,
    Link,
    Timestamp,
    SpecialCharacters,
    SpecialCharactersEssentials,
  ],
  fontFamily: {
    options: [
      "default",
      "Ubuntu, Arial, sans-serif",
      "Ubuntu Mono, Courier New, Courier, monospace",
    ],
  },
  fontSize: {
    options: Array.from({ length: 80 }, (_, i) => i + 1),
  },
  fontColor: {
    colors: [
      {
        color: "hsl(0, 0%, 0%)",
        label: "Black",
      },
      {
        color: "hsl(0, 0%, 30%)",
        label: "Dim grey",
      },
      {
        color: "hsl(0, 0%, 60%)",
        label: "Grey",
      },
      {
        color: "hsl(0, 0%, 90%)",
        label: "Light grey",
      },
      {
        color: "hsl(0, 0%, 100%)",
        label: "White",
        hasBorder: true,
      },
      // More colors.
      // ...
    ],
  },
  alignment: {
    options: ["left", "right", "center", "justify"],
  },
  fontBackgroundColor: {
    colors: [
      {
        color: "hsl(0, 75%, 60%)",
        label: "Red",
      },
      {
        color: "hsl(30, 75%, 60%)",
        label: "Orange",
      },
      {
        color: "hsl(60, 75%, 60%)",
        label: "Yellow",
      },
      {
        color: "hsl(90, 75%, 60%)",
        label: "Light green",
      },
      {
        color: "hsl(120, 75%, 60%)",
        label: "Green",
      },
      // More colors.
      // ...
    ],
  },
  toolbar: [
    "link",
    "fontFamily",
    "fontSize",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "bold",
    "italic",
    "underline",
    "bulletedList",
    "numberedList",
    "strikethrough",
    "subscript",
    "superscript",
    "|",
    "alignment",
    "|",
    "timestamp",
    "specialCharacters",
    {
      label: "More basic styles",
      icon: "plus",
      items: ["strikethrough", "superscript", "subscript"],
    },
  ],
})
  .then((editor) => {
    console.log(editor);
  })
  .catch((error) => {
    console.error(error);
  });

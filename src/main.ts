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

function SpecialCharactersEmoji(editor: any) {
  editor.plugins.get("SpecialCharacters").addItems(
    "Emoji",
    [
      { title: "smiley face", character: "😊" },
      { title: "rocket", character: "🚀" },
      { title: "wind blowing face", character: "🌬️" },
      { title: "floppy disk", character: "💾" },
      { title: "heart", character: "❤️" },
    ],
    { label: "Emoticons" },
  );
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
    SpecialCharactersEmoji,
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
    columns: 10,
    documentColors: 200,
    colors: [
      { color: "hsl(6, 54%, 95%)", label: " " },
      { color: "hsl(6, 54%, 89%)", label: " " },
      { color: "hsl(6, 54%, 78%)", label: " " },
      { color: "hsl(6, 54%, 68%)", label: " " },
      { color: "hsl(6, 54%, 57%)", label: " " },
      { color: "hsl(6, 63%, 46%)", label: " " },
      { color: "hsl(6, 63%, 41%)", label: " " },
      { color: "hsl(6, 63%, 35%)", label: " " },
      { color: "hsl(6, 63%, 29%)", label: " " },
      { color: "hsl(6, 63%, 24%)", label: " " },
      { color: "hsl(6, 78%, 96%)", label: " " },
      { color: "hsl(6, 78%, 91%)", label: " " },
      { color: "hsl(6, 78%, 83%)", label: " " },
      { color: "hsl(6, 78%, 74%)", label: " " },
      { color: "hsl(6, 78%, 66%)", label: " " },
      { color: "hsl(6, 78%, 57%)", label: " " },
      { color: "hsl(6, 59%, 50%)", label: " " },
      { color: "hsl(6, 59%, 43%)", label: " " },
      { color: "hsl(6, 59%, 37%)", label: " " },
      { color: "hsl(6, 59%, 30%)", label: " " },
      { color: "hsl(283, 39%, 95%)", label: " " },
      { color: "hsl(283, 39%, 91%)", label: " " },
      { color: "hsl(283, 39%, 81%)", label: " " },
      { color: "hsl(283, 39%, 72%)", label: " " },
      { color: "hsl(283, 39%, 63%)", label: " " },
      { color: "hsl(283, 39%, 53%)", label: " " },
      { color: "hsl(283, 34%, 47%)", label: " " },
      { color: "hsl(283, 34%, 40%)", label: " " },
      { color: "hsl(283, 34%, 34%)", label: " " },
      { color: "hsl(283, 34%, 28%)", label: " " },
      { color: "hsl(282, 39%, 95%)", label: " " },
      { color: "hsl(282, 39%, 89%)", label: " " },
      { color: "hsl(282, 39%, 79%)", label: " " },
      { color: "hsl(282, 39%, 68%)", label: " " },
      { color: "hsl(282, 39%, 58%)", label: " " },
      { color: "hsl(282, 44%, 47%)", label: " " },
      { color: "hsl(282, 44%, 42%)", label: " " },
      { color: "hsl(282, 44%, 36%)", label: " " },
      { color: "hsl(282, 44%, 30%)", label: " " },
      { color: "hsl(282, 44%, 25%)", label: " " },
      { color: "hsl(204, 51%, 94%)", label: " " },
      { color: "hsl(204, 51%, 89%)", label: " " },
      { color: "hsl(204, 51%, 78%)", label: " " },
      { color: "hsl(204, 51%, 67%)", label: " " },
      { color: "hsl(204, 51%, 55%)", label: " " },
      { color: "hsl(204, 64%, 44%)", label: " " },
      { color: "hsl(204, 64%, 39%)", label: " " },
      { color: "hsl(204, 64%, 34%)", label: " " },
      { color: "hsl(204, 64%, 28%)", label: " " },
      { color: "hsl(204, 64%, 23%)", label: " " },
      { color: "hsl(204, 70%, 95%)", label: " " },
      { color: "hsl(204, 70%, 91%)", label: " " },
      { color: "hsl(204, 70%, 81%)", label: " " },
      { color: "hsl(204, 70%, 72%)", label: " " },
      { color: "hsl(204, 70%, 63%)", label: " " },
      { color: "hsl(204, 70%, 53%)", label: " " },
      { color: "hsl(204, 62%, 47%)", label: " " },
      { color: "hsl(204, 62%, 40%)", label: " " },
      { color: "hsl(204, 62%, 34%)", label: " " },
      { color: "hsl(204, 62%, 28%)", label: " " },
      { color: "hsl(168, 55%, 94%)", label: " " },
      { color: "hsl(168, 55%, 88%)", label: " " },
      { color: "hsl(168, 55%, 77%)", label: " " },
      { color: "hsl(168, 55%, 65%)", label: " " },
      { color: "hsl(168, 55%, 54%)", label: " " },
      { color: "hsl(168, 76%, 42%)", label: " " },
      { color: "hsl(168, 76%, 37%)", label: " " },
      { color: "hsl(168, 76%, 32%)", label: " " },
      { color: "hsl(168, 76%, 27%)", label: " " },
      { color: "hsl(168, 76%, 22%)", label: " " },
      { color: "hsl(168, 42%, 94%)", label: " " },
      { color: "hsl(168, 42%, 87%)", label: " " },
      { color: "hsl(168, 42%, 74%)", label: " " },
      { color: "hsl(168, 42%, 61%)", label: " " },
      { color: "hsl(168, 45%, 49%)", label: " " },
      { color: "hsl(168, 76%, 36%)", label: " " },
      { color: "hsl(168, 76%, 31%)", label: " " },
      { color: "hsl(168, 76%, 27%)", label: " " },
      { color: "hsl(168, 76%, 23%)", label: " " },
      { color: "hsl(168, 76%, 19%)", label: " " },
      { color: "hsl(145, 45%, 94%)", label: " " },
      { color: "hsl(145, 45%, 88%)", label: " " },
      { color: "hsl(145, 45%, 77%)", label: " " },
      { color: "hsl(145, 45%, 65%)", label: " " },
      { color: "hsl(145, 45%, 53%)", label: " " },
      { color: "hsl(145, 63%, 42%)", label: " " },
      { color: "hsl(145, 63%, 37%)", label: " " },
      { color: "hsl(145, 63%, 32%)", label: " " },
      { color: "hsl(145, 63%, 27%)", label: " " },
      { color: "hsl(145, 63%, 22%)", label: " " },
      { color: "hsl(145, 61%, 95%)", label: " " },
      { color: "hsl(145, 61%, 90%)", label: " " },
      { color: "hsl(145, 61%, 80%)", label: " " },
      { color: "hsl(145, 61%, 69%)", label: " " },
      { color: "hsl(145, 61%, 59%)", label: " " },
      { color: "hsl(145, 63%, 49%)", label: " " },
      { color: "hsl(145, 63%, 43%)", label: " " },
      { color: "hsl(145, 63%, 37%)", label: " " },
      { color: "hsl(145, 63%, 31%)", label: " " },
      { color: "hsl(145, 63%, 25%)", label: " " },
      { color: "hsl(48, 89%, 95%)", label: " " },
      { color: "hsl(48, 89%, 90%)", label: " " },
      { color: "hsl(48, 89%, 80%)", label: " " },
      { color: "hsl(48, 89%, 70%)", label: " " },
      { color: "hsl(48, 89%, 60%)", label: " " },
      { color: "hsl(48, 89%, 50%)", label: " " },
      { color: "hsl(48, 88%, 44%)", label: " " },
      { color: "hsl(48, 88%, 38%)", label: " " },
      { color: "hsl(48, 88%, 32%)", label: " " },
      { color: "hsl(48, 88%, 26%)", label: " " },
      { color: "hsl(37, 90%, 95%)", label: " " },
      { color: "hsl(37, 90%, 90%)", label: " " },
      { color: "hsl(37, 90%, 80%)", label: " " },
      { color: "hsl(37, 90%, 71%)", label: " " },
      { color: "hsl(37, 90%, 61%)", label: " " },
      { color: "hsl(37, 90%, 51%)", label: " " },
      { color: "hsl(37, 86%, 45%)", label: " " },
      { color: "hsl(37, 86%, 39%)", label: " " },
      { color: "hsl(37, 86%, 33%)", label: " " },
      { color: "hsl(37, 86%, 27%)", label: " " },
      { color: "hsl(28, 80%, 95%)", label: " " },
      { color: "hsl(28, 80%, 90%)", label: " " },
      { color: "hsl(28, 80%, 81%)", label: " " },
      { color: "hsl(28, 80%, 71%)", label: " " },
      { color: "hsl(28, 80%, 61%)", label: " " },
      { color: "hsl(28, 80%, 52%)", label: " " },
      { color: "hsl(28, 74%, 46%)", label: " " },
      { color: "hsl(28, 74%, 39%)", label: " " },
      { color: "hsl(28, 74%, 33%)", label: " " },
      { color: "hsl(28, 74%, 27%)", label: " " },
      { color: "hsl(24, 71%, 94%)", label: " " },
      { color: "hsl(24, 71%, 88%)", label: " " },
      { color: "hsl(24, 71%, 77%)", label: " " },
      { color: "hsl(24, 71%, 65%)", label: " " },
      { color: "hsl(24, 71%, 53%)", label: " " },
      { color: "hsl(24, 100%, 41%)", label: " " },
      { color: "hsl(24, 100%, 36%)", label: " " },
      { color: "hsl(24, 100%, 31%)", label: " " },
      { color: "hsl(24, 100%, 26%)", label: " " },
      { color: "hsl(24, 100%, 22%)", label: " " },
      { color: "hsl(192, 15%, 99%)", label: " " },
      { color: "hsl(192, 15%, 99%)", label: " " },
      { color: "hsl(192, 15%, 97%)", label: " " },
      { color: "hsl(192, 15%, 96%)", label: " " },
      { color: "hsl(192, 15%, 95%)", label: " " },
      { color: "hsl(192, 15%, 94%)", label: " " },
      { color: "hsl(192, 5%, 82%)", label: " " },
      { color: "hsl(192, 3%, 71%)", label: " " },
      { color: "hsl(192, 2%, 60%)", label: " " },
      { color: "hsl(192, 1%, 49%)", label: " " },
      { color: "hsl(204, 8%, 98%)", label: " " },
      { color: "hsl(204, 8%, 95%)", label: " " },
      { color: "hsl(204, 8%, 90%)", label: " " },
      { color: "hsl(204, 8%, 86%)", label: " " },
      { color: "hsl(204, 8%, 81%)", label: " " },
      { color: "hsl(204, 8%, 76%)", label: " " },
      { color: "hsl(204, 5%, 67%)", label: " " },
      { color: "hsl(204, 4%, 58%)", label: " " },
      { color: "hsl(204, 3%, 49%)", label: " " },
      { color: "hsl(204, 3%, 40%)", label: " " },
      { color: "hsl(184, 9%, 96%)", label: " " },
      { color: "hsl(184, 9%, 92%)", label: " " },
      { color: "hsl(184, 9%, 85%)", label: " " },
      { color: "hsl(184, 9%, 77%)", label: " " },
      { color: "hsl(184, 9%, 69%)", label: " " },
      { color: "hsl(184, 9%, 62%)", label: " " },
      { color: "hsl(184, 6%, 54%)", label: " " },
      { color: "hsl(184, 5%, 47%)", label: " " },
      { color: "hsl(184, 5%, 40%)", label: " " },
      { color: "hsl(184, 5%, 32%)", label: " " },
      { color: "hsl(184, 6%, 95%)", label: " " },
      { color: "hsl(184, 6%, 91%)", label: " " },
      { color: "hsl(184, 6%, 81%)", label: " " },
      { color: "hsl(184, 6%, 72%)", label: " " },
      { color: "hsl(184, 6%, 62%)", label: " " },
      { color: "hsl(184, 6%, 53%)", label: " " },
      { color: "hsl(184, 5%, 46%)", label: " " },
      { color: "hsl(184, 5%, 40%)", label: " " },
      { color: "hsl(184, 5%, 34%)", label: " " },
      { color: "hsl(184, 5%, 27%)", label: " " },
      { color: "hsl(210, 12%, 93%)", label: " " },
      { color: "hsl(210, 12%, 86%)", label: " " },
      { color: "hsl(210, 12%, 71%)", label: " " },
      { color: "hsl(210, 12%, 57%)", label: " " },
      { color: "hsl(210, 15%, 43%)", label: " " },
      { color: "hsl(210, 29%, 29%)", label: " " },
      { color: "hsl(210, 29%, 25%)", label: " " },
      { color: "hsl(210, 29%, 22%)", label: " " },
      { color: "hsl(210, 29%, 18%)", label: " " },
      { color: "hsl(210, 29%, 15%)", label: " " },
      { color: "hsl(210, 9%, 92%)", label: " " },
      { color: "hsl(210, 9%, 85%)", label: " " },
      { color: "hsl(210, 9%, 70%)", label: " " },
      { color: "hsl(210, 9%, 55%)", label: " " },
      { color: "hsl(210, 14%, 39%)", label: " " },
      { color: "hsl(210, 29%, 24%)", label: " " },
      { color: "hsl(210, 29%, 21%)", label: " " },
      { color: "hsl(210, 29%, 18%)", label: " " },
      { color: "hsl(210, 29%, 16%)", label: " " },
      { color: "hsl(210, 29%, 13%)", label: " " },
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

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
    "underline",
    "strikethrough",
    "subscript",
    "superscript",
    "|",
    "alignment",
  ],
})
  .then((editor) => {
    console.log(editor);
  })
  .catch((error) => {
    console.error(error);
  });

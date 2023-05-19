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

import {
  Image,
  ImageInsert,
  AutoImage,
  ImageResizeEditing,
  ImageResizeHandles,
} from "@ckeditor/ckeditor5-image";
import { Timestamp } from "./plugins/custom";

import { Base64UploadAdapter } from "@ckeditor/ckeditor5-upload";

import {
  SpecialCharacters,
  SpecialCharactersEssentials,
} from "@ckeditor/ckeditor5-special-characters";

import { Colors } from "./plugins/colors/colors";

import { defaultColors, customColorsSet } from "./plugins/colors/colorValues";

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
    Base64UploadAdapter,
    Image,
    ImageInsert,
    AutoImage,
    ImageResizeEditing,
    ImageResizeHandles,
    Colors,
  ],
  toolbar: [
    "link",
    "fontFamily",
    "fontSize",
    "colorPicker",
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
    "specialCharacters",
    "insertImage",

    // {
    //   label: "More basic styles",
    //   icon: "plus",
    //   items: ["strikethrough", "superscript", "subscript"],
    // },
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
    ],
  },
})
  .then(() => {
    localStorage.setItem("defaultColors", JSON.stringify(defaultColors));
    localStorage.setItem(
      "customColorsSet",
      JSON.stringify(JSON.stringify(Array.from(customColorsSet))),
    );
  })
  .catch((error) => {
    console.error(error);
  });

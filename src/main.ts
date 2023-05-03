// import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Essentials } from "@ckeditor/ckeditor5-essentials";

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
import { BalloonEditor } from "@ckeditor/ckeditor5-editor-balloon";

BalloonEditor.create(document.querySelector("#editor") as HTMLElement, {
  // The plugins are now passed directly to .create().
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
  ],

  // So is the rest of the default configuration.

  toolbar: [
    "",
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
    "fontSize",
  ],
})
  .then((editor) => {
    console.log(editor);
  })
  .catch((error) => {
    console.error(error);
  });

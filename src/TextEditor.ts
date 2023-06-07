import BaseEditor, { TextEditorConfig } from "./BaseEditor";
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
import { Base64UploadAdapter } from "@ckeditor/ckeditor5-upload";

import {
  SpecialCharacters,
  SpecialCharactersEssentials,
} from "@ckeditor/ckeditor5-special-characters";

import { defaultColors, customColorsSet } from "./plugins/Colors/ColorValues";
import { DarkMode } from "./plugins/DarkMode/DarkMode";
import { Colors } from "./plugins/Colors/Colors";
import { PageLink } from "./plugins/PageLink/PageLink";
import { SpecialCharactersEmoji } from "./plugins/SpecialCharactersEmoji/SpecialCharactersEmoji";
import { Uppercase } from "./plugins/TextTransform/Uppercase";

export class TextEditor extends BaseEditor {
  constructor(
    sourceElementOrData: HTMLElement | string,
    config?: TextEditorConfig,
  ) {
    console.log(`Custom canvaflow editor loaded`);
    if (config) {
      config.plugins = PLUGINS;
      config.toolbar = TOOLBAR;
      config.alignment = {
        options: ["left", "right", "center", "justify"],
      };
    }

    localStorage.setItem("defaultColors", JSON.stringify(defaultColors));
    localStorage.setItem(
      "customColorsSet",
      JSON.stringify(JSON.stringify(Array.from(customColorsSet))),
    );

    super(sourceElementOrData, config);
  }
}

const PLUGINS = [
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
  SpecialCharacters,
  SpecialCharactersEssentials,
  SpecialCharactersEmoji as any,
  Base64UploadAdapter,
  Image,
  ImageInsert,
  AutoImage,
  ImageResizeEditing,
  ImageResizeHandles,
  Colors,
  DarkMode,
  PageLink,
  Uppercase,
];

const TOOLBAR = [
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
  "insertImage",
  "specialCharacters",
  "dark-mode",
  "pageLink",
  "Uppercase",
];

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
  ImageStyle,
  ImageToolbar,
  ImageResizeButtons,
} from "@ckeditor/ckeditor5-image";
import { Base64UploadAdapter } from "@ckeditor/ckeditor5-upload";
import {
  SpecialCharacters,
  SpecialCharactersEssentials,
} from "@ckeditor/ckeditor5-special-characters";
import { DarkMode } from "./plugins/DarkMode/DarkMode";
import { Colors } from "./plugins/Colors/Colors";
import { PageLink } from "./plugins/PageLink/PageLink";
import { SpecialCharactersEmoji } from "./plugins/SpecialCharactersEmoji/SpecialCharactersEmoji";
import { Uppercase } from "./plugins/Uppercase/Uppercase";
import { Lowercase } from "./plugins/Lowercase/Lowercase";
import { RemoveFormatting } from "./plugins/RemoveFormatting/RemoveFormatting";

import { ClearFormatting } from "./plugins/ClearFormatting/ClearFormatting";

import { Capitalize } from "./plugins/Capitalize/Capitalize";

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

      config.link = {
        decorators: {
          openInNewTab: {
            mode: "manual",
            label: "Open in a new tab",
            attributes: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
          protocol: {
            mode: "manual",
            label: "default protocol",
            attributes: {
              protocol: "https://",
            },
          },
        },
        // defaultProtocol: "http://",
      };

      config.image = {
        resizeOptions: [
          {
            name: "resizeImage:original",
            value: null,
            icon: "original",
          },
          {
            name: "resizeImage:50",
            value: "50",
            icon: "medium",
          },
          {
            name: "resizeImage:75",
            value: "75",
            icon: "large",
          },
        ],
        styles: {
          options: [
            "inline",
            "alignLeft",
            "alignRight",
            "alignCenter",
            "alignBlockLeft",
            "alignBlockRight",
            "block",
            "side",
          ],
        },
        toolbar: [
          "imageStyle:alignLeft",
          "imageStyle:alignRight",
          "imageStyle:alignCenter",
          "|",
          "resizeImage:50",
          "resizeImage:75",
          "resizeImage:original",
        ],
      };
    }
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
  ImageStyle,
  ImageToolbar,
  ImageResizeButtons,
  Colors,
  DarkMode,
  PageLink,
  Uppercase,
  Lowercase,
  RemoveFormatting,
  ClearFormatting,
  Capitalize,
];

const TOOLBAR = [
  "fontFamily",
  "fontSize",
  "colorPicker",
  "fontBackgroundColor",
  "|",
  {
    label: "Font Styles",
    icon: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.03791 9.98075C0.934777 9.6583 1.11603 9.37719 1.40005 9.24871C1.68408 9.12022 2.09463 9.13412 2.27071 9.45426C2.85393 10.5147 3.64599 10.7282 4.48665 10.7282C5.52721 10.7282 6.29659 10.2615 6.29659 9.45426C6.29659 8.8047 5.9119 8.46416 4.87134 8.14253L4.15872 7.92181C2.64518 7.44883 1.88842 6.69206 1.88842 5.45601C1.88842 3.79743 3.27583 2.6875 5.24342 2.6875C6.91733 2.6875 7.97409 3.33536 8.43833 4.31065C8.57087 4.58909 8.57614 4.91294 8.22794 5.19114C7.87974 5.46934 7.52351 5.34799 7.23327 5.03839C6.47215 4.22653 5.99545 4.04968 5.25604 4.04968C4.1398 4.04968 3.547 4.63618 3.547 5.27943C3.547 5.86592 3.96322 6.23169 4.94702 6.5344L5.67856 6.76143C7.22994 7.23441 7.97409 7.95964 7.97409 9.17047C7.97409 10.7723 6.69389 12.0903 4.46143 12.0903C2.86612 12.0903 1.40005 11.1131 1.03791 9.98075ZM11.8491 8.77985C10.661 8.39543 10.1649 7.86114 10.1649 6.98805C10.1649 5.86736 11.1636 5.04639 12.6128 5.04639C13.8546 5.04639 14.6629 5.63345 14.9778 6.6346C15.0443 6.84599 14.9593 6.98006 14.7475 7.0491C14.5394 7.11697 14.3176 7.09974 14.238 6.89611C13.9356 6.12273 13.352 5.76311 12.5998 5.76311C11.6467 5.76311 11.0135 6.25178 11.0135 6.91638C11.0135 7.45066 11.3464 7.75038 12.2473 8.04358L12.8348 8.23254C14.062 8.62999 14.5516 9.13821 14.5516 10.0178C14.5516 11.1972 13.481 12.0442 11.9927 12.0442C10.6439 12.0442 9.65644 11.2809 9.41979 10.3361C9.36535 10.1188 9.41192 10.0287 9.70039 9.96184C9.98886 9.89499 10.0714 9.89918 10.1715 10.1369C10.4555 10.8114 11.1531 11.3275 12.0318 11.3275C12.9914 11.3275 13.6834 10.7802 13.6834 10.0634C13.6834 9.53567 13.3961 9.28807 12.4366 8.97532L11.8491 8.77985Z" fill="currentColor" /> </svg>`,
    items: ["bold", "italic", "underline"],
  },
  {
    label: "Lists",
    icon: `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M2 3h20v18H2V3zm18 16V5H4v14h16zM8 7H6v2h2V7zm2 0h8v2h-8V7zm-2 4H6v2h2v-2zm2 0h8v2h-8v-2zm-2 4H6v2h2v-2zm2 0h8v2h-8v-2z" fill="currentColor"/> </svg>`,
    items: ["bulletedList", "numberedList"],
  },
  "alignment",
  {
    label: "Other Styles",
    icon: "",
    items: ["strikethrough", "subscript", "superscript"],
  },
  "|",
  "link",
  "pageLink",
  "insertImage",
  "specialCharacters",
  {
    label: "Text Formatting",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16"> <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/> </svg>`,
    items: ["dark-mode", "Uppercase", "Lowercase"],
  },
  "remove-formatting",
  "ClearFormatting",
  "Capitalize",
];

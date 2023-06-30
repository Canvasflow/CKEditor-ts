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
import { Alignment, AlignmentConfig } from "@ckeditor/ckeditor5-alignment";
import { Link } from "@ckeditor/ckeditor5-link";
import { Base64UploadAdapter } from "@ckeditor/ckeditor5-upload";
import {
  SpecialCharacters,
  SpecialCharactersEssentials,
} from "@ckeditor/ckeditor5-special-characters";
import { DarkMode } from "./plugins/DarkMode/DarkMode";
import { PageLink } from "./plugins/PageLink/PageLink";
import { SpecialCharactersEmoji } from "./plugins/SpecialCharactersEmoji/SpecialCharactersEmoji";
import { Uppercase } from "./plugins/Uppercase/Uppercase";
import { Lowercase } from "./plugins/Lowercase/Lowercase";
import { ClearFormatting } from "./plugins/ClearFormatting/ClearFormatting";
import { Capitalize } from "./plugins/Capitalize/Capitalize";
import { FontBackground } from "./plugins/FontBackground/FontBackground";
import { TextFontColor } from "./plugins/TextFontColor/TextFontColor";
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
import { TextSize } from "./plugins/TextSize/TextSize";

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

import fontStyles from "./assets/icons/fontStyles.svg?raw";
import lists from "./assets/icons/lists.svg?raw";
import textTransform from "./assets/icons/textFormatting.svg?raw";
import other from "./assets/icons/other.svg?raw";

export class TextEditor extends BaseEditor {
  constructor(
    sourceElementOrData: HTMLElement | string,
    config?: TextEditorConfig,
  ) {
    console.log(`Custom canvaflow editor loaded`);
    if (!config) {
      super(sourceElementOrData, config);
      return;
    }

    config.plugins = PLUGINS;
    config.toolbar = TOOLBAR;
    config.alignment = ALIGNMENT as AlignmentConfig;
    config.image = IMAGE;

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
      },
    };
    super(sourceElementOrData, config);
    if (config.colors) {
      this.colors = config.colors;
    }
    if (config.fontBackground) {
      this.fontBackground = config.fontBackground;
    }
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
  DarkMode,
  PageLink,
  Uppercase,
  Lowercase,
  ClearFormatting,
  Capitalize,
  FontBackground,
  TextFontColor,
  RemoveFormat,
  TextSize,
];

const TOOLBAR = [
  // "textSize",
  "fontFamily",
  "fontSize",
  "|",
  // "colorPicker",
  {
    label: "Font Styles",
    icon: fontStyles,
    items: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "subscript",
      "superscript",
    ],
  },
  "textFontColor",
  "backgroundColor",
  "ClearFormatting",
  "|",
  {
    label: "Lists",
    icon: lists,
    items: ["bulletedList", "numberedList"],
  },
  "alignment",
  {
    label: "Text Transform",
    icon: textTransform,
    items: ["Uppercase", "Lowercase", "Capitalize"],
  },
  "|",
  "Link",

  "pageLink",
  {
    label: "More",
    icon: other,
    items: ["specialCharacters", "imageUpload", "dark-mode"],
  },
];

const IMAGE = {
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

const ALIGNMENT = {
  options: ["left", "right", "center", "justify"],
};

import { Essentials } from "@ckeditor/ckeditor5-essentials";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
} from "@ckeditor/ckeditor5-basic-styles";
import {
  Image,
  ImageInsert,
  AutoImage,
  ImageResizeEditing,
  ImageResizeHandles,
} from "@ckeditor/ckeditor5-image";
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

import BaseEditor, { TextEditorConfig } from "./BaseEditor";
import { getIcon } from "./icons/icons";

/*CUSTOM PLUGINS*/
import { DarkMode } from "./plugins/DarkMode/DarkMode";
import { PageLink } from "./plugins/PageLink/PageLink";
import { SpecialCharactersEmoji } from "./plugins/SpecialCharacters/SpecialCharacters";
import { Uppercase } from "./plugins/Uppercase/Uppercase";
import { Lowercase } from "./plugins/Lowercase/Lowercase";
import { ClearFormat } from "./plugins/ClearFormat/ClearFormat";
import { Capitalize } from "./plugins/Capitalize/Capitalize";
import { HighlightColor } from "./plugins/HighlightColor/HighlightColor";
import { TextColor } from "./plugins/TextColor/TextColor";
import { StrikethroughColor } from "./plugins/StrikethroughColor/StrikethroughColor";
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
import { FontSize } from "./plugins/FontSize/FontSize";
import { FontFamily } from "./plugins/FontFamily/FontFamily";
import { FontStyles } from "./plugins/FontStyles/FontStyles";
import { SmallCaps } from "./plugins/SmallCaps/SmallCaps";
import { TitleCase } from "./plugins/TitleCase/TitleCase";

// Views
import { BoldView } from "./plugins/FontStyles/BoldView";
import { ItalicView } from "./plugins/FontStyles/ItalicView";
import { SubscriptView } from "./plugins/FontStyles/SubscriptView";
import { SuperscriptView } from "./plugins/FontStyles/SuperscriptView";
import { UnderlineView } from "./plugins/FontStyles/UnderlineView";
import { FontSizeComponent } from "./plugins/FontSize/FontSizeComponent";

import { DarkColor } from "./plugins/DarkColor/DarkColor";
import { DarkBackgroundColor } from "./plugins/DarkBackground/DarkBackgroundColor";

import { TitleEditor } from "./plugins/TitleEditor/TitleEditor";

export class TextEditor extends BaseEditor {
  constructor(
    sourceElementOrData: HTMLElement | string,
    config?: TextEditorConfig,
  ) {
    console.log(`Canvaflow editor loaded`);
    if (!config) {
      super(sourceElementOrData, config);
      return;
    }

    config.plugins = PLUGINS;
    config.toolbar = TOOLBAR;
    config.alignment = ALIGNMENT as AlignmentConfig;

    config.link = {
      decorators: {
        openInNewTab: {
          mode: "manual",
          label: "Open in a new tab",
          defaultValue: true,
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
    if (config.fontFamily?.options) {
      this.fonts = config.fontFamily?.options;
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
  DarkMode,
  PageLink,
  Uppercase,
  Lowercase,
  ClearFormat,
  Capitalize,
  HighlightColor,
  TextColor,
  RemoveFormat,
  FontSize,
  FontFamily,
  FontStyles,
  SmallCaps,
  StrikethroughColor,
  TitleCase,
  DarkColor,
  DarkBackgroundColor,
  TitleEditor,
];

const TOOLBAR = [
  {
    label: "Title",
    icon: getIcon("fontSize"),
    items: [TitleEditor.viewName],
    isEnabled: false,
  },
  // ,
  "|",
  FontFamily.viewName,
  "|",
  FontSizeComponent.viewName,
  "|",
  {
    label: "Font Styles",
    icon: getIcon("fontStyles"),
    items: [
      BoldView.viewName,
      ItalicView.viewName,
      UnderlineView.viewName,
      SubscriptView.viewName,
      SuperscriptView.viewName,
    ],
  },
  {
    label: "Strikethrough",
    icon: getIcon("striketrough"),
    items: [StrikethroughColor.viewName],
  },
  {
    label: "Text Color",
    icon: getIcon("fontColor"),
    items: [TextColor.viewName],
  },
  {
    label: "Highlight Color",
    icon: getIcon("highlightColor"),
    items: [HighlightColor.viewName],
  },
  ClearFormat.viewName,
  "|",
  {
    label: "Lists",
    icon: getIcon("list"),
    items: ["bulletedList", "numberedList"],
  },
  "alignment",
  {
    label: "Text Transform",
    icon: getIcon("textTransform"),
    items: [
      Uppercase.viewName,
      Lowercase.viewName,
      Capitalize.viewName,
      SmallCaps.viewName,
      TitleCase.viewName,
    ],
  },
  "|",
  "Link",
  PageLink.viewName,
  {
    label: "Dark Mode Options",
    icon: getIcon("darkmode"),
    items: [
      "dark-mode",
      {
        label: "Dark Color",
        icon: getIcon("fontColor"),
        items: [DarkColor.viewName],
      },
      {
        label: "Dark Background Color",
        icon: getIcon("highlightColor"),
        items: [DarkBackgroundColor.viewName],
      },
    ],
  },
  {
    label: "More",
    icon: getIcon("other"),
    items: ["specialCharacters", "imageUpload"],
  },
];

const ALIGNMENT = {
  options: ["left", "right", "center", "justify"],
};

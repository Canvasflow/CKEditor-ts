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
  ImageStyle,
  ImageToolbar,
  ImageResizeButtons,
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
import { getIcon } from './icons/icons'

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
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
import { FontSize } from "./plugins/TextSize/FontSize";
import { FontFamily } from "./plugins/FontFamily/FontFamily";
import { FontStyles } from "./plugins/FontStyles/FontStyles";

// Views
import { BoldView } from "./plugins/FontStyles/BoldView";
import { ItalicView } from "./plugins/FontStyles/ItalicView";
import { StrikethroughView } from "./plugins/FontStyles/StrikethroughView";
import { SubscriptView } from "./plugins/FontStyles/SubscriptView";
import { SuperscriptView } from "./plugins/FontStyles/SuperscriptView";
import { UnderlineView } from "./plugins/FontStyles/UnderlineView";
import { TextSizeComponent } from "./plugins/TextSize/TextSizeComponent";


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
  ImageStyle,
  ImageToolbar,
  ImageResizeButtons,
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
];

const TOOLBAR = [
  FontFamily.viewName,
  //"fontSize",
  "|",
  TextSizeComponent.viewName,
  "|",
  {
    label: "Font Styles",
    icon: getIcon('fontStyles'),
    items: [
      BoldView.viewName,
      ItalicView.viewName,
      UnderlineView.viewName,
      StrikethroughView.viewName,
      SubscriptView.viewName,
      SuperscriptView.viewName,
    ],
  },
  {
    label: "Font Color",
    icon: getIcon('fontColor'),
    items: [TextColor.viewName],
  },
  {
    label: "Highlight Color",
    icon: getIcon('highlightColor'),
    items: [HighlightColor.viewName],
  },
  ClearFormat.viewName,
  "|",
  {
    label: "Lists",
    icon: getIcon('list'),
    items: ["bulletedList", "numberedList"],
  },
  "alignment",
  {
    label: "Text Transform",
    icon: getIcon('textTransform'),
    items: [Uppercase.viewName, Lowercase.viewName, Capitalize.viewName],
  },
  "|",
  "Link",
  PageLink.viewName,
  {
    label: "More",
    icon: getIcon('other'),
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

import BaseEditor, { CustomEditorConfig } from "./BaseEditor";
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

/*CUSTOM PLUGINS*/
import { DarkMode } from "./plugins/DarkMode/DarkMode";
import { PageLink } from "./plugins/PageLink/PageLink";
import { SpecialCharactersEmoji } from "./plugins/SpecialCharactersEmoji/SpecialCharactersEmoji";
import { Uppercase } from "./plugins/Uppercase/Uppercase";
import { Lowercase } from "./plugins/Lowercase/Lowercase";
import { ClearFormatting } from "./plugins/ClearFormatting/ClearFormatting";
import { Capitalize } from "./plugins/Capitalize/Capitalize";
import { FontBackground } from "./plugins/FontBackground/FontBackground";
import { TextFontColor } from "./plugins/TextFontColor/TextFontColor";
// import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
// import { TextSize } from "./plugins/TextSize/TextSize";
// import { FontFamily } from "./plugins/FontFamily/FontFamily";
import { FontStyles } from "./plugins/FontStyles/FontStyles";

// Views
import { FontFamilyView } from "./plugins/FontFamily/FontFamilyView";
import { BoldView } from "./plugins/FontStyles/BoldView";
import { ItalicView } from "./plugins/FontStyles/ItalicView";
import { StrikethroughView } from "./plugins/FontStyles/StrikethroughView";
import { SubscriptView } from "./plugins/FontStyles/SubscriptView";
import { SuperscriptView } from "./plugins/FontStyles/SuperscriptView";
import { UnderlineView } from "./plugins/FontStyles/UnderlineView";

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

import { TextSizeComponent } from "./plugins/TextSize/TextSizeComponent";

export class CustomEditor extends BaseEditor {
  constructor(
    sourceElementOrData: HTMLElement | string,
    config?: CustomEditorConfig,
  ) {
    console.log(`Custom canvaflow editor loaded`);
    if (!config) {
      super(sourceElementOrData, config);
      return;
    }

    config.plugins = PLUGINS;
    config.toolbar = TOOLBAR;

    let ELEMENTS = { plugins: [], toolbar: [] };
    console.log(TOOLBAR);

    // if (config.components) {
    //   ELEMENTS = buildPlugins(config.components);
    // }

    //config.plugins = Array.from(ELEMENTS.plugins);
    //config.toolbar = Array.from(ELEMENTS.toolbar);

    //  config.alignment = ALIGNMENT as AlignmentConfig;
    //config.image = IMAGE;

    // config.link = {
    //   decorators: {
    //     openInNewTab: {
    //       mode: "manual",
    //       label: "Open in a new tab",
    //       attributes: {
    //         target: "_blank",
    //         rel: "noopener noreferrer",
    //       },
    //     },
    //   },
    // };
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

function buildPlugins(components: Array<string>) {
  let plugins = new Set();
  let toolbar = new Set();
  for (const plugin of components) {
    const pluginConfig = getPluginConfig(plugin);
    pluginConfig?.plugins.map((value) => {
      plugins.add(value);
    });
    toolbar.add(pluginConfig?.toolbar);
  }

  return { plugins, toolbar };
}

function getPluginConfig(plugin: string) {
  switch (plugin) {
    case "separator":
      return { plugins: [], toolbar: "|" };

    case "FontFamily":
      return { plugins: [], toolbar: FontFamilyView.viewName };

    case "FontSize":
      return { plugins: [], toolbar: TextSizeComponent.viewName };

    case "bold":
      return {
        plugins: [Essentials, Bold, FontStyles],
        toolbar: BoldView.viewName,
      };

    case "italic":
      return {
        plugins: [Essentials, Italic, FontStyles],
        toolbar: ItalicView.viewName,
      };

    case "underline":
      return {
        plugins: [Essentials, Underline, FontStyles],
        toolbar: UnderlineView.viewName,
      };

    case "strikethrough":
      return {
        plugins: [Essentials, Strikethrough, FontStyles],
        toolbar: StrikethroughView.viewName,
      };

    case "subscript":
      return {
        plugins: [Essentials, Subscript, FontStyles],
        toolbar: SubscriptView.viewName,
      };

    case "superscript":
      return {
        plugins: [Essentials, Superscript, FontStyles],
        toolbar: SuperscriptView.viewName,
      };

    case "Fontcolor":
      return { plugins: [TextFontColor], toolbar: "textFontColor" };

    case "BackgroundColor":
      return { plugins: [FontBackground], toolbar: "backgroundColor" };

    case "ClearFormatting":
      return { plugins: [ClearFormatting], toolbar: "ClearFormatting" };

    case "BulletedList":
      return { plugins: [List], toolbar: "bulletedList" };

    case "NumberedList":
      return { plugins: [List], toolbar: "numberedList" };

    case "alignment":
      //AQUI HAY QUE PONER CONFIG
      return { plugins: [Alignment], toolbar: "alignment" };

    case "Uppercase":
      return { plugins: [Uppercase], toolbar: "Uppercase" };

    case "lowercase":
      return { plugins: [Lowercase], toolbar: "Lowercase" };

    case "capitalize":
      return { plugins: [Capitalize], toolbar: "Capitalize" };

    case "link":
      return { plugins: [Link], toolbar: "Link" };

    case "PageLink":
      return { plugins: [Link, PageLink], toolbar: "pageLink" };

    case "SpecialCharacters":
      return {
        plugins: [
          SpecialCharacters,
          SpecialCharactersEssentials,
          SpecialCharactersEmoji as any,
        ],
        toolbar: "specialCharacters",
      };

    case "ImageUpload":
      //NECESITAMOS OPTIONS
      return {
        plugins: [
          Base64UploadAdapter,
          Image,
          ImageInsert,
          AutoImage,
          ImageResizeEditing,
          ImageResizeHandles,
          ImageStyle,
          ImageToolbar,
          ImageResizeButtons,
        ],
        toolbar: "imageUpload",
      };

    case "DarkMode":
      return { plugins: [DarkMode], toolbar: "dark-mode" };

    default:
      break;
  }
}

const PLUGINS = [
  Essentials,
  Bold,
  //   Italic,
  //   List,
  //   Paragraph,
  //   Underline,
  //   Strikethrough,
  //   Subscript,
  //   Superscript,
  Font,
  //   Alignment,
  //   Link,
  //   SpecialCharacters,
  //   SpecialCharactersEssentials,
  //   SpecialCharactersEmoji as any,
  //   Base64UploadAdapter,
  //   Image,
  //   ImageInsert,
  //   AutoImage,
  //   ImageResizeEditing,
  //   ImageResizeHandles,
  //   ImageStyle,
  //   ImageToolbar,
  //   ImageResizeButtons,
  //   DarkMode,
  //   PageLink,
  //   Uppercase,
  //   Lowercase,
  //   ClearFormatting,
  //   Capitalize,
  //   FontBackground,
  //   TextFontColor,
  //   RemoveFormat,
  //   TextSize,
  //   FontFamily,
  FontStyles,
];

const TOOLBAR = [BoldView.viewName];

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

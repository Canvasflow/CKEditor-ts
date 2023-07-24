import BaseEditor, { TextEditorConfig, GroupItem } from "./BaseEditor";
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
import { Capitalize } from "./plugins/Capitalize/Capitalize";
import { FontBackground } from "./plugins/FontBackground/FontBackground";
import { TextFontColor } from "./plugins/TextFontColor/TextFontColor";
import { ClearFormatting } from "./plugins/ClearFormatting/ClearFormatting";
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
import { TextSize } from "./plugins/TextSize/TextSize";
import { FontFamily } from "./plugins/FontFamily/FontFamily";
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
    config?: TextEditorConfig,
  ) {
    console.log(`Custom canvaflow editor loaded`);
    if (!config) {
      super(sourceElementOrData, config);
      return;
    }

    if (config.toolbar) {
      const build = buildPlugins(config.toolbar);
      config.plugins = [...build.plugins];
      config.toolbar = [...build.toolbar];
    }

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

  static build(
    sourceElementOrData: HTMLElement | string,
    config: TextEditorConfig,
    toolbar: Array<string | GroupItem>,
  ): Promise<BaseEditor> {
    config.toolbar = toolbar;
    return super.create(sourceElementOrData, config) as Promise<BaseEditor>;
  }
}

function buildPlugins(components: Array<string | GroupItem>): {
  plugins: Set<any>;
  toolbar: Set<any>;
} {
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
      return {
        plugins: [Essentials, Paragraph, Font, FontFamily],
        toolbar: FontFamilyView.viewName,
      };

    case "FontSize":
      return {
        plugins: [Essentials, Paragraph, Font, TextSize],
        toolbar: TextSizeComponent.viewName,
      };

    case "bold":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Bold],
        toolbar: BoldView.viewName,
      };

    case "italic":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Italic],
        toolbar: ItalicView.viewName,
      };

    case "underline":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Underline],
        toolbar: UnderlineView.viewName,
      };

    case "strikethrough":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Strikethrough],
        toolbar: StrikethroughView.viewName,
      };

    case "subscript":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Subscript],
        toolbar: SubscriptView.viewName,
      };

    case "superscript":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Superscript],
        toolbar: SuperscriptView.viewName,
      };

    case "Fontcolor":
      return { plugins: [TextFontColor], toolbar: "textFontColor" };

    case "BackgroundColor":
      return { plugins: [FontBackground], toolbar: "backgroundColor" };

    case "ClearFormatting":
      //ERROR
      return {
        plugins: [Essentials, RemoveFormat, ClearFormatting],
        toolbar: "ClearFormatting",
      };

    case "BulletedList":
      return {
        plugins: [Essentials, List, Paragraph],
        toolbar: "bulletedList",
      };

    case "NumberedList":
      return {
        plugins: [Essentials, List, Paragraph],
        toolbar: "numberedList",
      };

    case "alignment":
      return {
        plugins: [Essentials, Paragraph, Alignment],
        toolbar: "alignment",
      };

    case "Uppercase":
      return {
        plugins: [Essentials, Paragraph, Uppercase],
        toolbar: "Uppercase",
      };

    case "lowercase":
      return {
        plugins: [Essentials, Paragraph, Lowercase],
        toolbar: "Lowercase",
      };

    case "capitalize":
      return {
        plugins: [Essentials, Paragraph, Capitalize],
        toolbar: "Capitalize",
      };

    case "link":
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
      return {
        plugins: [Paragraph, Link],
        toolbar: "Link",
      };

    case "PageLink":
      return { plugins: [Paragraph, Link, PageLink], toolbar: "pageLink" };

    case "SpecialCharacters":
      return {
        plugins: [
          Paragraph,
          SpecialCharacters,
          SpecialCharactersEssentials,
          SpecialCharactersEmoji as any,
        ],
        toolbar: "specialCharacters",
      };

    case "ImageUpload":
      //   const IMAGE = {
      //     resizeOptions: [
      //       {
      //         name: "resizeImage:original",
      //         value: null,
      //         icon: "original",
      //       },
      //       {
      //         name: "resizeImage:50",
      //         value: "50",
      //         icon: "medium",
      //       },
      //       {
      //         name: "resizeImage:75",
      //         value: "75",
      //         icon: "large",
      //       },
      //     ],
      //     styles: {
      //       options: [
      //         "inline",
      //         "alignLeft",
      //         "alignRight",
      //         "alignCenter",
      //         "alignBlockLeft",
      //         "alignBlockRight",
      //         "block",
      //         "side",
      //       ],
      //     },
      //     toolbar: [
      //       "imageStyle:alignLeft",
      //       "imageStyle:alignRight",
      //       "imageStyle:alignCenter",
      //       "|",
      //       "resizeImage:50",
      //       "resizeImage:75",
      //       "resizeImage:original",
      //     ],
      //   };

      return {
        plugins: [
          Essentials,
          Paragraph,
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
      return {
        plugins: [Paragraph, DarkMode, Essentials],
        toolbar: "dark-mode",
      };

    default:
      break;
  }
}

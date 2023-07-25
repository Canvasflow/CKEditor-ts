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
import { FontBackground } from "./plugins/HighlightColor/HighlightColor";
import { TextColor } from "./plugins/TextColor/TextColor";
import { ClearFormat } from "./plugins/ClearFormat/ClearFormat";
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
import { FontSize } from "./plugins/TextSize/FontSize";
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

import fontStyles from "./assets/icons/fontStyles.svg?raw";
import lists from "./assets/icons/lists.svg?raw";
import textTransform from "./assets/icons/textFormatting.svg?raw";
import other from "./assets/icons/other.svg?raw";
import fontColor from "./assets/icons/fontColor.svg?raw";
import backgroundColor from "./assets/icons/fontBackground.svg?raw";

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
    if (typeof plugin === "string") {
      const pluginConfig = getPluginConfig(plugin);
      pluginConfig?.plugins.map((value) => {
        plugins.add(value);
      });
      if (plugin === "Fontcolor" || plugin === "BackgroundColor") {
        const pluginView = {
          label: plugin,
          icon: getIcon(plugin),
          items: ["textFontColor"],
        };
        toolbar.add(pluginView);
      } else {
        toolbar.add(pluginConfig?.toolbar);
      }
    } else {
      for (const item of plugin.items) {
        const pluginConfig = getPluginConfig(item);
        console.log(pluginConfig);
        pluginConfig?.plugins.map((value) => {
          plugins.add(value);
        });
      }
      plugin.icon = getIcon(plugin.icon);
      toolbar.add(plugin);
    }
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
        plugins: [Essentials, Paragraph, Font, FontSize],
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
      return {
        plugins: [Essentials, Paragraph, Font, TextColor],
        toolbar: "textFontColor",
      };

    case "BackgroundColor":
      return {
        plugins: [Essentials, Paragraph, Font, FontBackground],
        toolbar: "backgroundColor",
      };

    case "ClearFormatting":
      //ERROR
      return {
        plugins: [Essentials, RemoveFormat, ClearFormat],
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

    case "Lowercase":
      return {
        plugins: [Essentials, Paragraph, Lowercase],
        toolbar: "Lowercase",
      };

    case "Capitalize":
      return {
        plugins: [Essentials, Paragraph, Capitalize],
        toolbar: "Capitalize",
      };

    case "link":
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
        plugins: [Paragraph, Essentials, DarkMode],
        toolbar: "dark-mode",
      };

    default:
      break;
  }
}

function getIcon(icon: string): any {
  switch (icon) {
    case "fontStyles":
      return fontStyles;

    case "lists":
      return lists;

    case "textTransform":
      return textTransform;

    case "other":
      return other;

    case "Fontcolor":
      return fontColor;

    case "BackgroundColor":
      return backgroundColor;

    default:
      return other;
  }
}

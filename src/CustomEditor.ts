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
import { SpecialCharactersEmoji } from "./plugins/SpecialCharacters/SpecialCharacters";
import { Uppercase } from "./plugins/Uppercase/Uppercase";
import { Lowercase } from "./plugins/Lowercase/Lowercase";
import { Capitalize } from "./plugins/Capitalize/Capitalize";
import { HighlightColor } from "./plugins/HighlightColor/HighlightColor";
import { TextColor } from "./plugins/TextColor/TextColor";
import { ClearFormat } from "./plugins/ClearFormat/ClearFormat";
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
import { FontSize } from "./plugins/FontSize/FontSize";
import { FontFamily } from "./plugins/FontFamily/FontFamily";
import { FontStyles } from "./plugins/FontStyles/FontStyles";
import { TitleCase } from "./plugins/TitleCase/TitleCase";
import { DarkColor } from "./plugins/DarkColor/DarkColor";
import { DarkBackgroundColor } from "./plugins/DarkBackground/DarkBackgroundColor";

// Views
import { BoldView } from "./plugins/FontStyles/BoldView";
import { ItalicView } from "./plugins/FontStyles/ItalicView";
import { StrikethroughView } from "./plugins/FontStyles/StrikethroughView";
import { SubscriptView } from "./plugins/FontStyles/SubscriptView";
import { SuperscriptView } from "./plugins/FontStyles/SuperscriptView";
import { UnderlineView } from "./plugins/FontStyles/UnderlineView";

import { TitleEditor } from "./plugins/TitleEditor/TitleEditor";

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

import { FontSizeComponent } from "./plugins/FontSize/FontSizeComponent";

import { getIcon } from "./icons/icons";

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
      if (plugin === "FontColor" || plugin === "HighlightColor") {
        const pluginView = {
          label: plugin === "FontColor" ? "Text Color" : "Highlight Color",
          icon: getIconList(plugin),
          items: [
            plugin === "FontColor" ? "cf-text-color" : "cf-hightlight-color",
          ],
        };
        toolbar.add(pluginView);
      } else if (plugin === "DarkColor" || plugin === "DarkBackground") {
        const pluginView = {
          label:
            plugin === "DarkColor"
              ? "Dark Text Color"
              : "Dark Background Color",
          icon: getIconList(plugin),
          items: [
            plugin === "DarkColor"
              ? "cf-dark-color"
              : "cf-dark-background-color",
          ],
        };
        toolbar.add(pluginView);
      } else {
        toolbar.add(pluginConfig?.toolbar);
      }
    } else {
      for (const item of plugin.items) {
        const pluginConfig = getPluginConfig(item);
        pluginConfig?.plugins.map((value) => {
          plugins.add(value);
        });
      }
      plugin.icon = getIconList(plugin.icon);
      toolbar.add(plugin);
    }
  }
  return { plugins, toolbar };
}

function getPluginConfig(plugin: any) {
  switch (plugin) {
    case "Separator":
      return { plugins: [], toolbar: "|" };

    case "FontFamily":
      return {
        plugins: [Essentials, Paragraph, Font, FontFamily],
        toolbar: FontFamily.viewName,
      };

    case "FontSize":
      return {
        plugins: [Essentials, Paragraph, Font, FontSize],
        toolbar: FontSizeComponent.viewName,
      };

    case "Bold":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Bold],
        toolbar: BoldView.viewName,
      };

    case "Italic":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Italic],
        toolbar: ItalicView.viewName,
      };

    case "Underline":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Underline],
        toolbar: UnderlineView.viewName,
      };

    case "Strikethrough":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Strikethrough],
        toolbar: StrikethroughView.viewName,
      };

    case "Subscript":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Subscript],
        toolbar: SubscriptView.viewName,
      };

    case "Superscript":
      return {
        plugins: [Essentials, Paragraph, Font, FontStyles, Superscript],
        toolbar: SuperscriptView.viewName,
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

    case "Alignment":
      return {
        plugins: [Essentials, Paragraph, Alignment],
        toolbar: "alignment",
      };

    case "Uppercase":
      return {
        plugins: [Essentials, Paragraph, Uppercase],
        toolbar: Uppercase.viewName,
      };

    case "Lowercase":
      return {
        plugins: [Essentials, Paragraph, Lowercase],
        toolbar: Lowercase.viewName,
      };

    case "Capitalize":
      return {
        plugins: [Essentials, Paragraph, Capitalize],
        toolbar: Capitalize.viewName,
      };

    case "Link":
      return {
        plugins: [Paragraph, Link],
        toolbar: "Link",
      };

    case "PageLink":
      return {
        plugins: [Paragraph, Link, PageLink],
        toolbar: PageLink.viewName,
      };

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

    case "TitleCase":
      return {
        plugins: [Essentials, Paragraph, TitleCase],
        toolbar: TitleCase.viewName,
      };

    case "TitleEditor":
      return {
        plugins: [Paragraph, TitleEditor],
        toolbar: TitleEditor.viewName,
      };

    case "FontColor":
      return {
        plugins: [Essentials, Paragraph, Font, TextColor],
      };

    case "HighlightColor":
      return {
        plugins: [Essentials, Paragraph, Font, HighlightColor],
      };

    case "ClearFormatting":
      return {
        plugins: [Essentials, RemoveFormat, ClearFormat],
        toolbar: ClearFormat.viewName,
      };

    case "DarkColor":
      return {
        plugins: [Essentials, Paragraph, Font, DarkColor],
      };

    case "DarkBackground":
      return {
        plugins: [Essentials, Paragraph, Font, DarkBackgroundColor],
      };

    default:
      break;
  }
}

function getIconList(icon: string): any {
  switch (icon) {
    case "fontStyles":
      return getIcon("fontStyles");

    case "lists":
      return getIcon("list");

    case "textTransform":
      return getIcon("textTransform");

    case "other":
      return getIcon("other");

    case "FontColor":
      return getIcon("fontColor");

    case "DarkColor":
      return getIcon("fontDark");

    case "HighlightColor":
      return getIcon("highlightColor");

    case "DarkBackground":
      return getIcon("darkBackground");

    default:
      return getIcon("other");
  }
}

import { TextFontColorUI } from "./TextFontColorUI";
import { TextFontColorEditing } from "./TextFontColorEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";
import { PageLinkSource } from "../../BaseEditor";

export class TextFontColor extends Plugin {
  pageLinkSources: Array<PageLinkSource> = [];
  static get requires() {
    return [TextFontColorUI, TextFontColorEditing];
  }
}

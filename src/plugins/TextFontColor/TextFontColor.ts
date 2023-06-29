import { TextFontColorUI } from "./TextFontColorUI";
import { TextFontColorEditing } from "./TextFontColorEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

export class TextFontColor extends Plugin {
  static get requires() {
    return [TextFontColorUI, TextFontColorEditing];
  }
}

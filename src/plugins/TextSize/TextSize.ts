import { TextSizeUI } from "./TextSizeUI";
import { TextSizeEditing } from "./TextSizeEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

export class TextSize extends Plugin {
  static get requires() {
    return [TextSizeUI, TextSizeEditing];
  }
}

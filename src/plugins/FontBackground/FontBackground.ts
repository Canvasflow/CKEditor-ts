import { FontBackgroundUI } from "./FontBackgroundUI";
import { FontBackgroundEditing } from "./FontBackgroundEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

export class FontBackground extends Plugin {
  static get requires() {
    return [FontBackgroundUI, FontBackgroundEditing];
  }
}

import { ColorPickerUI } from "./ColorsUI";
import { ColorEditing } from "./ColorsEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

export class Colors extends Plugin {
  static get requires() {
    return [ColorPickerUI, ColorEditing];
  }
}

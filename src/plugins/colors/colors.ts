import { ColorPickerUI } from "./colorsUI";
import { ColorEditing } from "./colorsEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

export class Colors extends Plugin {
  static get requires() {
    return [ColorPickerUI, ColorEditing];
  }
}

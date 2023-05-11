import { AbbreviationUI } from "./colorsUI";
import { AbbreviationEditing } from "./colorsEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

export class Colors extends Plugin {
  static get requires() {
    return [AbbreviationUI, AbbreviationEditing];
  }
}

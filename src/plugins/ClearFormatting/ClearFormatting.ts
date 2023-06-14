import { ClearFormattingEditing } from "./ClearFormattingEditing";
import { ClearFormattingUI } from "./ClearFormattingUI";
import { Plugin } from "@ckeditor/ckeditor5-core";

export class ClearFormatting extends Plugin {
  static get requires() {
    return [ClearFormattingUI, ClearFormattingEditing];
  }
}

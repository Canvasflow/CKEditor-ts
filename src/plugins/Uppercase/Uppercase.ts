import { UppercaseEditing } from "./UppercaseEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";
import { UppercaseUI } from "./UppercaseUI";

export class Uppercase extends Plugin {
  static get requires() {
    return [UppercaseUI, UppercaseEditing];
  }
}

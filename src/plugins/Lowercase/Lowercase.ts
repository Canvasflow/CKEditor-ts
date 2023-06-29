import { LowercaseEditing } from "./LowercaseEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";
import { LowercaseUI } from "./LowercaseUI";

export class Lowercase extends Plugin {
  static get requires() {
    return [LowercaseUI, LowercaseEditing];
  }
}

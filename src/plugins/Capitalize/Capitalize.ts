import { CapitalizeEditing } from "./CapitalizeEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";
import { CapitalizeUI } from "./CapitalizeUI";

export class Capitalize extends Plugin {
  static get requires() {
    return [CapitalizeUI, CapitalizeEditing];
  }
}

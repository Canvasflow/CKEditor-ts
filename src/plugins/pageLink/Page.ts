import { PageUI } from "./PageUI";
import { PageEditing } from "./PageEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

export class PageLink extends Plugin {
  static get requires() {
    return [PageUI, PageEditing];
  }
}

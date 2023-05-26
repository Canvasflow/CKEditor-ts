import { PageLinkUI } from "./PageLinkUI";
import { PageLinkEditing } from "./PageLinkEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

export class PageLink extends Plugin {
  static get requires() {
    return [PageLinkUI, PageLinkEditing];
  }
}

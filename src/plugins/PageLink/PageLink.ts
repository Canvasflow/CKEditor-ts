import { PageLinkUI } from "./PageLinkUI";
import { PageLinkEditing } from "./PageLinkEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

import { PageLinkSource } from '../../BaseEditor'

export class PageLink extends Plugin {
  pageLinkSources: Array<PageLinkSource> = [];
  static get requires() {
    return [PageLinkUI, PageLinkEditing];
  }
}

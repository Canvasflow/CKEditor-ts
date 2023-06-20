import { LinkUI } from "./LinkUI";
import { LinkEditing } from "./LinkEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

import { PageLinkSource } from "../../BaseEditor";

export class Link extends Plugin {
  pageLinkSources: Array<PageLinkSource> = [];
  static get requires() {
    return [LinkUI, LinkEditing];
  }
}

import { ExternalLinkUI } from "./ExternalLinkUI";
import { ExternalLinkEditing } from "./ExternalLinkEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

import { PageLinkSource } from "../../BaseEditor";

export class ExternalLink extends Plugin {
  pageLinkSources: Array<PageLinkSource> = [];
  static get requires() {
    return [ExternalLinkUI, ExternalLinkEditing];
  }
}

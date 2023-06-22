import { ExternalLinkUI } from "./ExternalLinkUI";
import { ExternalLinkEditing } from "./ExternalLinkEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";

export class ExternalLink extends Plugin {
  static get requires() {
    return [ExternalLinkUI, ExternalLinkEditing];
  }
}

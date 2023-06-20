import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { LinkView } from "./LinkView";
import CanvasflowEditor, { PageLinkSource } from "../../BaseEditor";
import { BaseEvent, GetCallback, Locale } from "@ckeditor/ckeditor5-utils";
import icon from "./LinkIcon.svg?raw";

export class LinkUI extends Plugin {
  declare editor: CanvasflowEditor;
  balloon: any;
  pageLinkView?: LinkView;
  selectedPage?: String;
  selectedAnchor?: String;
  locale?: Locale;
  pageLinkSources: Array<PageLinkSource> = [];

  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    this.locale = this.editor.locale;
  }
}

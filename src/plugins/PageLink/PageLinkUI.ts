import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { PageLinkView, PageLinkViewer } from "./PageLinkView";
import check from "@ckeditor/ckeditor5-core/theme/icons/check.svg";
import CanvasflowEditor, { PageLinkSource } from "../../BaseEditor";
import { BaseEvent, GetCallback, Locale } from "@ckeditor/ckeditor5-utils";

export class PageLinkUI extends Plugin implements PageLinkViewer {
  declare editor: CanvasflowEditor;
  balloon: any;
  pageLinkView?: PageLinkView;
  selectedPage?: String;
  selectedAnchor?: String;
  locale?: Locale;
  pageLinkSources: Array<PageLinkSource> = [];

  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    this.locale = this.editor.locale;
    this.pageLinkSources = this.editor.config.get(
      "pageLinkSources",
    ) as Array<PageLinkSource>;
    if (!this.pageLinkSources.length) {
      return;
    }
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    this.createView();
    this.createButton();
  }

  createView() {
    const editor = this.editor;
    this.pageLinkView = new PageLinkView(this);
    this.pageLinkView.createPages(this.pageLinkSources);
    this.pageLinkView.showView();

    this.listenTo(this.pageLinkView, "submit", () => {
      let url = `/article/${this.selectedPage}`;
      if (this.selectedAnchor) {
        url += `#${this.selectedAnchor}`;
      }
      editor.execute("PageLink", url);
      this.clearValues();
    });

    clickOutsideHandler({
      emitter: this.pageLinkView,
      activator: () => this.balloon.visibleView === this.pageLinkView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });
  }

  clearValues() {
    this.hideUI();
    this.selectedAnchor = undefined;
    this.selectedPage = undefined;
    this.pageLinkView?.removeButtonView();
    this.pageLinkView?.removeAnchorDropdown();
    this.pageLinkView?.resetPageLinkDropdown();
  }

  hideUI() {
    if (this.balloon) this.balloon.remove(this.pageLinkView);
  }

  createButton() {
    this.editor.ui.componentFactory.add("pageLink", () => {
      const button = new ButtonView();
      button.label = "Go to Page";
      button.tooltip = true;
      button.withText = false;
      button.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z"/> </g> </svg>`;
      this.listenTo(button, "execute", () => {
        this.showUI();
      });
      return button;
    });
  }

  showUI() {
    this.balloon.add({
      view: this.pageLinkView,
      position: this.getBalloonPositionData(),
    });
  }

  getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = () => {
      const firstRange = viewDocument.selection.getFirstRange();
      if (!firstRange) {
        return;
      }
      return view.domConverter.viewRangeToDom(firstRange);
    };
    return {
      target,
    };
  }

  onSelectPage: GetCallback<BaseEvent> = (evt) => {
    const source: any = evt.source;
    const { data } = source;
    this.selectedPage = data.pageLink.id;
    this.pageLinkView?.selectPage(data.pageLink.title);
    this.selectedAnchor = undefined;
    if (!this.editor.anchorFn) {
      return;
    }
    this.editor.anchorFn(data.pageLink.id).then((anchors) => {
      if (anchors.length === 0) {
        this.pageLinkView?.removeAnchorDropdown();
        this.pageLinkView?.insertButtonView();
        return;
      }
      this.pageLinkView?.removeButtonView();
      this.pageLinkView?.createAnchors(anchors);
      this.pageLinkView?.insertButtonView();
    });
  };

  onSelectAnchor: GetCallback<BaseEvent> = (evt) => {
    const source: any = evt.source;
    const { data } = source;
    this.selectedAnchor = data.pageLink.id;
    this.pageLinkView?.selectAnchor(data.pageLink.title);
    this.pageLinkView?.insertButtonView();
  };
}

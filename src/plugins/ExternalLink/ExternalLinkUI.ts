import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { ExternalLinkView, ExternalLinkViewer } from "./ExternalLinkView";
import CanvasflowEditor from "../../BaseEditor";
import icon from "./ExternalLinkIcon.svg?raw";
import { Locale } from "@ckeditor/ckeditor5-utils";

export class ExternalLinkUI extends Plugin implements ExternalLinkViewer {
  declare editor: CanvasflowEditor;
  balloon: any;
  linkView?: ExternalLinkView;
  locale?: Locale;

  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    this.locale = this.editor.locale;
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    this.createView();
    this.createButton();
  }

  private createView() {
    const editor = this.editor;
    this.linkView = new ExternalLinkView(this);
    this.linkView.showView();
    this.listenTo(this.linkView, "submit", () => {
      console.log("submit called");
    });

    clickOutsideHandler({
      emitter: this.linkView,
      activator: () => this.balloon.visibleView === this.linkView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });
  }

  private hideUI() {
    if (this.balloon) this.balloon.remove(this.linkView);
  }

  private createButton() {
    this.editor.ui.componentFactory.add("ExternalLink", () => {
      const button = new ButtonView();
      button.label = "Link URL";
      button.tooltip = true;
      button.withText = false;
      button.icon = icon;
      this.listenTo(button, "execute", () => {
        this.showUI();
      });
      return button;
    });
  }

  private showUI() {
    this.balloon.add({
      view: this.linkView,
      position: this.getBalloonPositionData(),
    });
  }

  private getBalloonPositionData() {
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
}

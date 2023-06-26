import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { TextFontColorView, TextFontColorViewer } from "./TextFontColorView";
import CanvasflowEditor, { PageLinkSource } from "../../BaseEditor";
import { BaseEvent, GetCallback, Locale } from "@ckeditor/ckeditor5-utils";
import icon from "./TextFontColorIcon.svg?raw";

export class TextFontColorUI extends Plugin implements TextFontColorViewer {
  declare editor: CanvasflowEditor;
  balloon: any;
  textFontColorView?: TextFontColorView;
  selectedPage?: String;
  selectedAnchor?: String;
  locale?: Locale;
  pageLinkSources: Array<PageLinkSource> = [];

  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    this.locale = this.editor.locale;
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    this.createView();
    this.createButton();
    //here
  }

  private createView() {
    this.textFontColorView = new TextFontColorView(this);
    this.textFontColorView.showView();

    this.listenTo(this.textFontColorView, "submit", () => {
      console.log("submit called");
    });

    clickOutsideHandler({
      emitter: this.textFontColorView,
      activator: () => this.balloon.visibleView === this.textFontColorView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });
  }

  private clearValues() {
    this.hideUI();
  }

  private hideUI() {
    if (this.balloon) this.balloon.remove(this.textFontColorView);
  }

  private createButton() {
    this.editor.ui.componentFactory.add("textFontColor", () => {
      const button = new ButtonView();
      button.label = "Font Color";
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
      view: this.textFontColorView,
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

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { TextSizeView, TextSizeViewer } from "./TextSizeView";
import CanvasflowEditor from "../../BaseEditor";
import { Locale } from "@ckeditor/ckeditor5-utils";
import icon from "./TextSizeIcon.svg?raw";
export class TextSizeUI extends Plugin implements TextSizeViewer {
  declare editor: CanvasflowEditor;
  balloon: any;
  fontSizeView?: TextSizeView;
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
    this.fontSizeView = new TextSizeView(this);
    this.fontSizeView.showView();

    this.listenTo(this.fontSizeView, "submit", () => {
      console.log("submit called");
      //editor.execute("", null);
    });

    clickOutsideHandler({
      emitter: this.fontSizeView,
      activator: () => this.balloon.visibleView === this.fontSizeView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });
  }

  private hideUI() {
    if (this.balloon) this.balloon.remove(this.fontSizeView);
  }

  private createButton() {
    this.editor.ui.componentFactory.add("textSize", () => {
      const button = new ButtonView();
      button.label = "Font Size";
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
      view: this.fontSizeView,
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

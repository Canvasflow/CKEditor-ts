import CanvasflowEditor from "../../BaseEditor";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { Locale } from "@ckeditor/ckeditor5-utils";
import { Plugin } from "@ckeditor/ckeditor5-core";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { TitleEditorView, TitleEditorViewer } from "./TitleEditorView";
import { TitleEditorEditing } from "./TitleEditorEditing";
import { getIcon } from "../../icons/icons";

export class TitleEditor extends Plugin implements TitleEditorViewer {
  static viewName = "cf-title-editor";
  declare editor: CanvasflowEditor;
  balloon: any;
  titleEditorView?: TitleEditorView;
  locale?: Locale;

  init() {
    this.locale = this.editor.locale;
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    this.createView();
    this.createButton();
  }

  private createView() {
    this.titleEditorView = new TitleEditorView(this);
    this.titleEditorView.showView();

    this.listenTo(this.titleEditorView, "submit", () => {
      if (this.titleEditorView?.element)
        console.log("ADD WAS CALLED", this.titleEditorView.titleValue);
    });

    clickOutsideHandler({
      emitter: this.titleEditorView,
      activator: () => this.balloon.visibleView === this.titleEditorView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });
  }

  private hideUI() {
    if (this.balloon) this.balloon.remove(this.titleEditorView);
  }

  private createButton() {
    this.editor.ui.componentFactory.add(TitleEditor.viewName, () => {
      const button = new ButtonView();
      button.label = "Go to Page";
      button.tooltip = true;
      button.withText = false;
      button.icon = getIcon("goToPage");
      this.listenTo(button, "execute", () => {
        this.showUI();
      });
      return button;
    });
  }

  private showUI() {
    this.balloon.add({
      view: this.titleEditorView,
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

  static get requires() {
    return [ContextualBalloon, TitleEditorEditing];
  }
}

import CanvasflowEditor from "../../BaseEditor";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { Locale } from "@ckeditor/ckeditor5-utils";
import { Plugin } from "@ckeditor/ckeditor5-core";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { TitleEditorView, TitleEditorViewer } from "./TitleEditorView";
import { TitlePopupView } from "./TitlePopupView";
import { TitleEditorEditing } from "./TitleEditorEditing";
import { getIcon } from "../../icons/icons";
import { TITLE_EDITOR_COMMAND } from "./TitleEditorCommands";

export class TitleEditor extends Plugin implements TitleEditorViewer {
  static viewName = "cf-title-editor";
  declare editor: CanvasflowEditor;
  balloon: any;
  titleEditorView?: TitleEditorView;
  titleEditorPopup?: TitlePopupView;
  locale?: Locale;

  init() {
    this.locale = this.editor.locale;
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    this.createView();
    this.createButton();

    const { model } = this.editor;
    const { document } = model;
    document.selection.on("change:range", this.onSelectionChange);
  }

  onSelectionChange = () => {
    const { selection } = this.editor.model.document;
    if (!selection) {
      return;
    }
    const range = selection.getFirstRange();
    if (!range) {
      return;
    }
    let found = false;
    for (const item of range.getItems()) {
      if (item.hasAttribute("title")) {
        found = true;
        continue;
      }
    }
    // CONFIRM IF THE ONLY PROPERTY THAT EXIST WAS TITLE
    if (found) {
      this.titleEditorPopup = new TitlePopupView(this);
      this.titleEditorPopup.showView();
      this.balloon.add({
        view: this.titleEditorPopup,
        position: this.getBalloonPositionData(),
      });
    }
  };

  private createView() {
    this.titleEditorView = new TitleEditorView(this);
    this.titleEditorView.showView();

    this.listenTo(this.titleEditorView, "submit", () => {
      this.editor.execute(
        TITLE_EDITOR_COMMAND,
        this.titleEditorView!.titleValue,
      );
      this.hideUI();
      // CLEAR VALUES AND CLOSE PANEL
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
      button.label = "Title Editor";
      button.tooltip = true;
      button.withText = false;
      button.icon = getIcon("title");
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

import CanvasflowEditor from "../../BaseEditor";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { Locale } from "@ckeditor/ckeditor5-utils";
import { Plugin } from "@ckeditor/ckeditor5-core";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { TitleEditorView, TitleEditorViewer } from "./TitleEditorView";
import { TitlePopupView } from "./TitlePopupView";
import { TitleEditorEditing } from "./TitleEditorEditing";
import { getIcon } from "../../icons/icons";
import {
  TITLE_EDITOR_COMMAND,
  TITLE_EDITOR_CLEAR,
} from "./TitleEditorCommands";

export class TitleEditor extends Plugin implements TitleEditorViewer {
  static viewName = "cf-title-editor";
  declare editor: CanvasflowEditor;
  balloon: any;
  titleEditorView?: TitleEditorView;
  titleEditorPopup?: TitlePopupView;
  locale?: Locale;
  view: TitlePopupView;
  titleValue: any;

  constructor(editor: CanvasflowEditor) {
    super(editor);
    this.locale = this.editor.locale;
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    const { model } = this.editor;
    const { document } = model;
    this.createView();
    this.createButton();
    this.titleValue = document.selection.on(
      "change:range",
      this.onSelectionChange,
    );

    this.view = new TitlePopupView(this);
    this.editor.ui.componentFactory.add(TitleEditor.viewName, () => {
      const titleEditorPopup = new TitlePopupView(this);
      titleEditorPopup.showView();
      this.listenTo(titleEditorPopup.removeTitleButtonView, "execute", () => {
        this.editor.execute(TITLE_EDITOR_CLEAR);
        //CLOSE UI
      });
      return titleEditorPopup;
    });
  }

  // init() {
  //   // const { model } = this.editor;
  //   // const { document } = model;
  //   // this.createView();
  //   // this.createButton();
  //   // document.selection.on("change:range", this.onSelectionChange);
  // }

  onSelectionChange = () => {
    //console.log(this.balloon.visibleView);
    const { selection } = this.editor.model.document;
    if (!selection) {
      return;
    }
    const range = selection.getFirstRange();
    if (!range) {
      return;
    }
    let found = false;
    let title: any = "";
    for (const item of range.getItems()) {
      if (item.hasAttribute("title")) {
        title = item.getAttribute("title");
        continue;
      }
    }

    return title;
    console.log("title", title);
    // TODO: CONFIRM IF THE ONLY PROPERTY THAT EXIST WAS TITLE

    if (found) {
      //console.log("found title", range.getItems());
      // this.titleEditorPopup = new TitlePopupView(this);
      // this.titleEditorPopup.showView();
      // this.listenTo(
      //   this.titleEditorPopup.removeTitleButtonView,
      //   "execute",
      //   () => {
      //     console.log("CALLED REMOVE TITLE");
      //     this.balloon.remove(this.titleEditorPopup);
      //     this.editor.execute(TITLE_EDITOR_CLEAR);
      //     //if (this.balloon) this.balloon.remove(this.titleEditorPopup);
      //   },
      // );
      // this.listenTo(
      //   this.titleEditorPopup.EditTitleButtonView,
      //   "execute",
      //   () => {
      //     this.balloon.remove(this.titleEditorPopup);
      //   },
      // );
      // // this.balloon.add({
      // //   view: this.titleEditorPopup,
      // //   position: this.getBalloonPositionData(),
      // // });
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
      // TODO: CLEAR VALUES AND CLOSE PANEL
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

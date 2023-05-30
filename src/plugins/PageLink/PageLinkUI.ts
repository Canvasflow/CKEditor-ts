import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { PageLinkView } from "./PageLinkView";
import check from "@ckeditor/ckeditor5-core/theme/icons/check.svg";
import CanvasflowEditor from "../../BaseCanvasflowEditor";

export class PageLinkUI extends Plugin {
  declare editor: CanvasflowEditor;
  balloon: any;
  formView: any;
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    this.formView = this.createFormView();

    editor.ui.componentFactory.add("pageLink", () => {
      const button = new ButtonView();
      button.label = "Go to Page";
      button.tooltip = true;
      button.withText = false;
      button.icon = check;
      this.listenTo(button, "execute", () => {
        this.showUI();
      });

      return button;
    });
  }

  createFormView() {
    const editor = this.editor;
    const formView = new PageLinkView(editor);
    this.listenTo(formView, "submit", () => {
      console.log("called submit");
    });

    this.listenTo(formView, "execute", (_) => {
      console.log("called execute");
    });

    clickOutsideHandler({
      emitter: formView,
      activator: () => this.balloon.visibleView === formView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });

    return formView;
  }

  showUI() {
    this.balloon.add({
      view: this.formView,
      position: this.getBalloonPositionData(),
    });
  }

  hideUI() {
    if (this.balloon) this.balloon.remove(this.formView);
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
}

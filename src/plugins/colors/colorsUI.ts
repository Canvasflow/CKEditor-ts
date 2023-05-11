import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { FormView } from "./colorsView";

export class ColorPickerUI extends Plugin {
  _balloon: any;
  formView: any;
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    this._balloon = this.editor.plugins.get(ContextualBalloon);
    this.formView = this._createFormView();

    editor.ui.componentFactory.add("colorPicker", () => {
      const button = new ButtonView();

      button.label = "Color picker";
      button.tooltip = true;
      button.withText = true;

      this.listenTo(button, "execute", () => {
        this.showUI();
      });

      return button;
    });
  }

  _createFormView() {
    const editor = this.editor;
    const formView = new FormView(editor.locale);

    this.listenTo(formView, "submit", () => {
      const input = document.getElementById("color-picker");
      input.type = "color";
      input?.click();
    });

    this.listenTo(formView, "cancel", () => {
      this.hideUI();
    });

    clickOutsideHandler({
      emitter: formView,
      activator: () => this._balloon.visibleView === formView,
      contextElements: [this._balloon.view.element],
      callback: () => this.hideUI(),
    });

    return formView;
  }

  showUI() {
    setTimeout(() => {
      const input = document.getElementById("color-picker");
      if (input) {
        input.setAttribute("style", "visibility: hidden;");
      }
    }, 10);
    this._balloon.add({
      view: this.formView,
      position: null, //this.getBalloonPositionData(),
    });

    this.formView.focus();
  }

  hideUI() {
    console.log("i tried to close the picker");
    console.log(
      "value of picker is:",
      document.getElementById("color-picker").value,
    );
    // this.formView.element.reset();
    // this._balloon.remove(this.formView);
    // this.editor.editing.view.focus();
  }

  // getBalloonPositionData() {
  //   const view = this.editor.editing.view;
  //   const viewDocument = view.document;
  //   let target: any;

  //   target = () =>
  //     view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());

  //   return {
  //     target,
  //   };
  // }
}

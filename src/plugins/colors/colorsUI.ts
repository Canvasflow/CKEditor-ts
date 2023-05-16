import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { ColorsView } from "./colorsView";
import { customColors } from "./colorValues";
import Command from "@ckeditor/ckeditor5-core/src/command";

export class ColorPickerUI extends Plugin {
  balloon: any;
  formView: any;
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    this.formView = this.createFormView();

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

  createFormView() {
    const editor = this.editor;
    const formView = new ColorsView(editor.locale);
    this.listenTo(formView, "submit", () => {
      const input: HTMLInputElement | null = document.getElementById(
        "color-picker",
      ) as HTMLInputElement;
      if (input === null) {
        return;
      }
      input.type = "color";
      input.setAttribute("style", "visibility: hidden");
      input.onchange = (e: any) => {
        const color = e.target.value;
        if (color && color !== "#000000") {
          customColors.push({
            label: color,
            color: color,
            source: "customs",
          });

          this.balloon.remove(this.formView);
          this.init();
          this.balloon.add({
            view: this.formView,
            position: this.getBalloonPositionData(),
          });
        }
      };
      input?.click();
    });

    this.listenTo(formView, "execute", (element, data) => {
      editor.execute("fontColor", data.label);
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
    let target: any;

    target = () =>
      view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());

    return {
      target,
    };
  }
}

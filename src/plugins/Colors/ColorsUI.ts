import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { ColorsView } from "./ColorsView";
import { customColorsSet } from "./ColorValues";
import CanvasflowEditor from "../../BaseEditor";

export class ColorPickerUI extends Plugin {
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
    editor.ui.componentFactory.add("colorPicker", () => {
      return this.createButton();
    });
  }

  createButton() {
    const button = new ButtonView();
    button.label = "Color picker";
    button.tooltip = true;
    button.withText = false;
    button.icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16"> <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/> <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/> </svg>`;
    this.listenTo(button, "execute", () => {
      this.showUI();
    });
    return button;
  }

  showUI() {
    this.balloon.add({
      view: this.formView,
      position: this.getBalloonPositionData(),
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
          editor.dispatch('add-color', { color })
          this.setColor(color);
        }
      };
      input?.click();
    });

    this.listenTo(formView, "execute", (_, data) => {
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
  hideUI() {
    if (this.balloon) this.balloon.remove(this.formView);
  }

  setColor(color: string) {
    const findList = Array.from(customColorsSet).find((value: any) => {
      if (value.color === color) return value;
    });

    if (!findList) {
      customColorsSet.add({
        label: color,
        color: color,
      });
      localStorage.setItem(
        "customColorsSet",
        JSON.stringify(JSON.stringify(Array.from(customColorsSet))),
      );
      //this.formView.this.formView.render();

      this.balloon.remove(this.formView);
      this.init();
      this.balloon.add({
        view: this.formView,
        position: this.getBalloonPositionData(),
      });
    }
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

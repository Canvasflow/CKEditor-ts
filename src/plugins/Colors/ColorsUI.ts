import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { ColorsView } from "./ColorsView";
import { customColorsSet } from "./ColorValues";
import { AddCustomColorEvent } from "./ColorsEvents";
import CanvasflowEditor from "../../BaseEditor";

export class ColorPickerUI extends Plugin {
  declare editor: CanvasflowEditor;
  balloon: any;
  colorView: any;
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    this.colorView = this.createFormView();
    editor.ui.componentFactory.add("colorPicker", () => {
      return this.createButton();
    });
  }

  createButton() {
    const button = new ButtonView();
    button.label = "Font Color";
    button.tooltip = true;
    button.withText = false;
    button.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M15.246 14H8.754l-1.6 4H5l6-15h2l6 15h-2.154l-1.6-4zm-.8-2L12 5.885 9.554 12h4.892zM3 20h18v2H3v-2z"/> </g> </svg>`;
    this.listenTo(button, "execute", () => {
      this.showUI();
    });
    return button;
  }

  showUI() {
    this.balloon.add({
      view: this.colorView,
      position: this.getBalloonPositionData(),
    });
  }

  createFormView() {
    const editor = this.editor;
    const colorView = new ColorsView(editor.locale); //cambiar a ColorView
    this.listenTo(colorView, "submit", () => {
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
          const evt: AddCustomColorEvent = {
            color,
          };
          editor.dispatch("colors:addCustomColor", evt);
          this.setColor(color);
        }
      };
      input?.click();
    });

    this.listenTo(colorView, "execute", (_, data) => {
      editor.execute("fontColor", data.label);
    });

    clickOutsideHandler({
      emitter: colorView,
      activator: () => this.balloon.visibleView === colorView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });
    return colorView;
  }
  hideUI() {
    if (this.balloon) this.balloon.remove(this.colorView);
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

      this.balloon.remove(this.colorView);
      this.init();
      this.balloon.add({
        view: this.colorView,
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

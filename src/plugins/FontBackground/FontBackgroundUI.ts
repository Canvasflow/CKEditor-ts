import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { FontBackgroundView } from "./FontBackgroundView";
//import { AddCustomColorEvent } from "./FontBackgroundEvents";
import CanvasflowEditor, { Colors, TextEditorConfig } from "../../BaseEditor";
import icon from "./FontBackgroundIcon.svg?raw";
import Config from "@ckeditor/ckeditor5-utils/src/config";

export class FontBackgroundUI extends Plugin {
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
    editor.ui.componentFactory.add("backgroundColor", () => {
      return this.createButton();
    });
  }

  private createButton() {
    const button = new ButtonView();
    button.label = "Font Background Color";
    button.tooltip = true;
    button.withText = false;
    button.icon = icon;
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

  private createFormView() {
    const editor = this.editor;
    const colorView = new FontBackgroundView(editor.locale, editor);
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
          // const evt: AddCustomColorEvent = {
          //   color,
          // };
          //editor.dispatch("colors:addCustomColor", evt);
          this.setColor(color);
        }
      };
      input?.click();
    });

    this.listenTo(colorView, "execute", (_, data) => {
      editor.execute("backgroundColor", data.label);
    });

    clickOutsideHandler({
      emitter: colorView,
      activator: () => this.balloon.visibleView === colorView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });
    return colorView;
  }

  private hideUI() {
    if (this.balloon) this.balloon.remove(this.colorView);
  }

  private setColor(color: string) {
    const fontBackground = this.editor.config.get("fontBackground") as Colors;

    const findList = fontBackground.customColor.find((value: any) => {
      if (value.color === color) return value;
    });

    if (findList) {
      return;
    }
    fontBackground.customColor.push({ label: color, color: color });
    const editorConfig: Config<TextEditorConfig> = this.editor
      .config as Config<TextEditorConfig>;
    editorConfig.set({ fontBackground });
    this.balloon.remove(this.colorView);
    this.init();
    this.balloon.add({
      view: this.colorView,
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

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { TextFontColorView, TextFontColorViewer } from "./TextFontColorView";
import CanvasflowEditor, { Colors } from "../../BaseEditor";
import { Locale } from "@ckeditor/ckeditor5-utils";
import icon from "./TextFontColorIcon.svg?raw";

export class TextFontColorUI extends Plugin implements TextFontColorViewer {
  declare editor: CanvasflowEditor;
  balloon: any;
  textFontColorView?: TextFontColorView;
  selectedPage?: String;
  selectedAnchor?: String;
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
    this.textFontColorView = new TextFontColorView(editor.locale, editor);
    this.textFontColorView.showView();

    this.listenTo(this.textFontColorView, "submit", () => {
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
          this.balloon.remove(this.textFontColorView);
        }
      };
      input?.click();
    });

    clickOutsideHandler({
      emitter: this.textFontColorView,
      activator: () => this.balloon.visibleView === this.textFontColorView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });
  }

  private setColor(color: string) {
    const colors = this.editor.config.get("colors") as Colors;
    console.log(colors);

    const findList = colors.customColor.find((value: any) => {
      if (value.color === color) return value;
    });

    if (findList) {
      return;
    }

    colors.customColor.push({ label: color, color: color });
    // const editorConfig: Config<TextEditorConfig> = this.editor
    //   .config as Config<TextEditorConfig>;
    // editorConfig.set({ colors });
    // this.balloon.remove(this.colorView);
    // this.init();
    // this.balloon.add({
    //   view: this.colorView,
    //   position: this.getBalloonPositionData(),
    // });
  }

  private clearValues() {
    this.hideUI();
  }

  private hideUI() {
    if (this.balloon) this.balloon.remove(this.textFontColorView);
  }

  private createButton() {
    this.editor.ui.componentFactory.add("textFontColor", () => {
      const button = new ButtonView();
      button.label = "Font Color";
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
      view: this.textFontColorView,
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

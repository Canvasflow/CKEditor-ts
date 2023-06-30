import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
//import { TextFontColorView } from "./TextFontColorView";
import { ColorView } from "../ColorView/ColorView";
import CanvasflowEditor, { Color } from "../../BaseEditor";
import { Locale } from "@ckeditor/ckeditor5-utils";
import {
  SET_FONT_COLOR_COMMAND,
  CLEAR_FONT_COLOR_COMMAND,
} from "./TextFontColorCommands";
import icon from "../../assets/icons/fontColor.svg?raw";
import { AddCustomColorEvent } from "./TextFontColorEvents";

export class TextFontColorUI extends Plugin {
  declare editor: CanvasflowEditor;
  balloon: any;
  textFontColorView?: ColorView;
  locale?: Locale;

  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    this.locale = this.editor.locale;
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    this.createButton();
  }

  private createView() {
    const editor = this.editor;
    this.textFontColorView = new ColorView(
      editor.locale,
      editor,
      editor.colors!,
      "Remove Font Color",
    );
    this.textFontColorView.onClearColor = this.onClearColor;

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
          this.setColor(color);
          const evt: AddCustomColorEvent = {
            color,
          };
          editor.dispatch("colors:addCustomColor", evt);
        }
      };
      input?.click();
    });

    this.listenTo(
      this.textFontColorView.defaultColorsGridView!.gridView,
      "execute",
      this.onSetColor,
    );

    this.textFontColorView.customColorsGridView!.onSelectColor =
      this.onCustomSetColor;

    this.listenTo(
      this.textFontColorView.customColorsGridView!.gridView,
      "execute",
      this.onSetColor,
    );

    clickOutsideHandler({
      emitter: this.textFontColorView,
      activator: () => this.balloon.visibleView === this.textFontColorView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });
  }

  private onClearColor(editor: CanvasflowEditor) {
    editor.execute(CLEAR_FONT_COLOR_COMMAND);
  }

  private onCustomSetColor = (color: Color) => {
    this.editor.execute(SET_FONT_COLOR_COMMAND, color.color);
  };

  private onSetColor = (evt: any, data: Color) => {
    if (data && data.label) {
      this.editor.execute(SET_FONT_COLOR_COMMAND, data.label);
      return;
    }
    if (!evt.source.color) {
      return;
    }
    this.editor.execute(SET_FONT_COLOR_COMMAND, evt.source.color);
  };

  private setColor(color: string) {
    const colors = this.editor.colors;
    if (!colors) {
      return;
    }
    const findList = colors.customColor.find((value: any) => {
      if (value.color === color) return value;
    });

    if (findList) {
      return;
    }

    colors.customColor.push({ label: color, color: color });
    this.textFontColorView?.customColorsGridView?.addColor(color, color);
    //this.textFontColorView?.addCustomColor(color, color);
  }

  private hideUI() {
    const input: HTMLInputElement | null = document.getElementById(
      "color-picker",
    ) as HTMLInputElement;
    const visibility = input.getAttribute("style");
    if (visibility !== "visibility: hidden") {
      this.balloon.remove(this.textFontColorView);
    } else {
      input.setAttribute("style", "");
    }
  }

  private createButton() {
    this.editor.ui.componentFactory.add("textFontColor", () => {
      const button = new ButtonView();
      button.label = "Font Color";
      button.tooltip = true;
      button.withText = false;
      button.icon = icon;
      this.listenTo(button, "execute", () => {
        this.createView();
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

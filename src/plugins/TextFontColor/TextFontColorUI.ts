import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";

import {
  ColorView,
  ColorViewer,
  ColorViewerType,
} from "../ColorView/ColorView";
import CanvasflowEditor, { Colors } from "../../BaseEditor";
import { Locale } from "@ckeditor/ckeditor5-utils";
import {
  SET_FONT_COLOR_COMMAND,
  CLEAR_FONT_COLOR_COMMAND,
} from "./TextFontColorCommands";
import { AddCustomColorEvent } from "./TextFontColorEvents";

export class TextFontColorUI extends Plugin implements ColorViewer {
  selectedColor: string = "";

  declare editor: CanvasflowEditor;
  static viewName = "textFontColor";
  balloon: any;
  textFontColorView?: ColorView;
  locale?: Locale;
  attribute: ColorViewerType = "fontColor";
  colors: Colors = {
    defaultColor: [],
    customColor: [],
  };

  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    this.locale = this.editor.locale;
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    this.createView();
    this.createButton();
  }

  createView = () => {
    const editor = this.editor;
    this.colors = editor.colors!;
    this.textFontColorView = new ColorView(this);

    clickOutsideHandler({
      emitter: this.textFontColorView,
      activator: () => this.balloon.visibleView === this.textFontColorView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });
  };

  onSetColor = (color: string) => {
    this.editor.execute(SET_FONT_COLOR_COMMAND, color);
    this.textFontColorView!.setGridsSelectedColor(color);
  };

  onClearColor() {
    this.editor.execute(CLEAR_FONT_COLOR_COMMAND);
  }

  onPickColor() {
    const colors = this.editor.colors;
    console.log(colors);
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
        console.log("IN FONT COLOR");
        this.setColor(color);
        const evt: AddCustomColorEvent = {
          color,
        };
        this.editor.dispatch("colors:addCustomColor", evt);
      }
    };
    input?.click();
  }

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
    console.log("FONT COLORS:", colors);
    const tileView =
      this.textFontColorView?.customColorsGridView?.mapColorTileView(
        color,
        color,
      );
    this.textFontColorView?.customColorsGridView?.gridView.items.add(tileView!);
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
    this.editor.ui.componentFactory.add(TextFontColorUI.viewName, () => {
      return new ColorView(this);
    });
  }
}

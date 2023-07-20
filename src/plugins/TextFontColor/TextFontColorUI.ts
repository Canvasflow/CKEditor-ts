import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { ContextualBalloon } from "@ckeditor/ckeditor5-ui";

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
  editor: CanvasflowEditor;
  static viewName = "textFontColor";
  textFontColorView: ColorView;
  locale?: Locale;
  attribute: ColorViewerType = "fontColor";
  colors: Colors = {
    defaultColor: [],
    customColor: [],
  };

  constructor(editor: CanvasflowEditor) {
    super(editor);
    this.editor = editor;
    this.colors = editor.colors!;
    this.locale = this.editor.locale;

    this.textFontColorView = new ColorView(this);
    this.editor.ui.componentFactory.add(TextFontColorUI.viewName, () => {
      const view = new ColorView(this);
      const querySelector = `[data-cke-tooltip-text="Font Color"]`;
      const node: HTMLButtonElement | null =
        document.querySelector(querySelector);
      if (node) {
        node.onclick = () => {
          console.log(`Listener font color`);
          view.resetCustomColorCollection();
        };
      }
      return view;
    });
  }

  static get requires() {
    return [ContextualBalloon];
  }

  onSetColor = (color: string) => {
    this.editor.execute(SET_FONT_COLOR_COMMAND, color);
    this.textFontColorView!.setGridsSelectedColor(color);
  };

  onClearColor() {
    this.editor.execute(CLEAR_FONT_COLOR_COMMAND);
  }

  onPickColor() {
    const { setColor } = this;
    const input: HTMLInputElement | null = document.getElementById(
      "font-color-picker",
    ) as HTMLInputElement;
    if (input === null) {
      return;
    }
    input.type = "color";
    input.setAttribute("style", "visibility: hidden");
    input.onchange = (e: any) => {
      const color = e.target.value;
      if (color && color !== "#000000") {
        setColor(color);
        const evt: AddCustomColorEvent = {
          color,
        };
        this.editor.dispatch("colors:addCustomColor", evt);
        this.editor.dispatch("colors:addCustomColorToView", evt);
      }
    };
    input?.click();
  }

  private setColor = (color: string) => {
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
  };
}

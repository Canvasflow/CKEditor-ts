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
  SET_BACKGROUND_COLOR_COMMAND,
  CLEAR_BACKGROUND_COLOR_COMMAND,
} from "./FontBackgroundCommands";
import { AddCustomFontBackgroundEvent } from "./FontBackgroundEvents";

export class FontBackgroundUI extends Plugin implements ColorViewer {
  static viewName = "backgroundColor";
  selectedColor: string = "";
  editor: CanvasflowEditor;
  textFontColorView: ColorView;
  locale?: Locale;
  attribute: ColorViewerType = "backgroundColor";
  colors: Colors = {
    defaultColor: [],
    customColor: [],
  };

  constructor(editor: CanvasflowEditor) {
    super(editor);
    this.editor = editor;
    this.colors = editor.fontBackground!;
    this.locale = this.editor.locale;
    this.textFontColorView = new ColorView(this);
    this.editor.ui.componentFactory.add(FontBackgroundUI.viewName, () => {
      const view = new ColorView(this);
      const querySelector = `[data-cke-tooltip-text="Background Color"]`;
      const node: HTMLButtonElement | null = document.querySelector(querySelector);
      if (node) {
        node.onclick = () => {
          console.log(`Listener background color`)
          view.resetCustomColorCollection();
        }
      }
      return view;
    });
  }

  static get requires() {
    return [ContextualBalloon];
  }

  onSetColor = (color: string) => {
    this.editor.execute(SET_BACKGROUND_COLOR_COMMAND, color);
    this.textFontColorView!.setGridsSelectedColor(color);
  };

  onClearColor() {
    this.editor.execute(CLEAR_BACKGROUND_COLOR_COMMAND);
  }

  onPickColor() {
    const { setColor } = this;
    const input: HTMLInputElement | null = document.getElementById(
      "background-color-picker",
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
        const evt: AddCustomFontBackgroundEvent = {
          color,
        };
        this.editor.dispatch("colors:addCustomBackgroundColor", evt);
      }
    };
    input?.click();
  }

  private setColor = (color: string) => {
    const colors = this.editor.fontBackground;
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

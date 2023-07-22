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
        };
      }
      return view;
    });

    this.on('add:color', (_, color: any) => {
      console.log(`IN THE CONSTRUCTOR`, color)
      this.textFontColorView.addColor(color);
    })
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
        this.fire('add:color', { color: color, label: color })
        this.editor.dispatch("colors:addCustomColor", evt);
      }
    };
    input?.click();
  }

  private setColor = (color: string) => {
    console.log(`I add to custom text color: ${color}`)
    // this.textFontColorView.customColorsGridView.gridView.add({ label: color, color: color });

  };
}

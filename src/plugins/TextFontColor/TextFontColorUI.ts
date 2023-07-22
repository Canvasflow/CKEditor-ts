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
  view: ColorView;
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

    this.view = new ColorView(this);
    this.editor.ui.componentFactory
      .add(TextFontColorUI.viewName, () => this.view);
  }

  static get requires() {
    return [ContextualBalloon];
  }

  onSetColor = (color: string) => {
    this.editor.execute(SET_FONT_COLOR_COMMAND, color);
    this.view.setGridsSelectedColor(color);
  };

  onClearColor() {
    this.editor.execute(CLEAR_FONT_COLOR_COMMAND);
  }

  onAddColor = (color: string) => {
    const evt: AddCustomColorEvent = {
      color,
    };
    this.editor.dispatch("colors:addCustomColor", evt);
  }
}

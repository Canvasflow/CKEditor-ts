import CanvasflowEditor, { Colors } from "../../BaseEditor";
import { Locale } from "@ckeditor/ckeditor5-utils";
import { DarkColorEditing } from "./DarkColorEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";
import { ContextualBalloon } from "@ckeditor/ckeditor5-ui";
import { AddCustomDarkColorEvent } from "./DarkColorEvents";
import {
  ColorView,
  ColorViewer,
  ColorViewerType,
} from "../../views/ColorView/ColorView";
import {
  SET_DARK_COLOR_COMMAND,
  CLEAR_DARK_COLOR_COMMAND,
} from "./DarkColorCommands";

export class DarkColor extends Plugin implements ColorViewer {
  static viewName = "cf-dark-color";
  selectedColor: string = "";
  editor: CanvasflowEditor;
  locale?: Locale;
  attribute: ColorViewerType = "darkColor";
  view: ColorView;
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
    this.editor.ui.componentFactory.add(DarkColor.viewName, () => {
      const view = new ColorView(this);
      const querySelector = `[data-cke-tooltip-text="Dark Color"]`;
      const node: HTMLButtonElement | null =
        document.querySelector(querySelector);
      if (node) {
        node.onclick = () => {
          view.resetCustomColorCollection();
        };
      }
      return view;
    });
  }

  renderView = () => {
    return this.view;
  };

  onSetColor = (color: string) => {
    this.editor.execute(SET_DARK_COLOR_COMMAND, color);
    this.view.setGridsSelectedColor(color);
  };

  onClearColor() {
    this.editor.execute(CLEAR_DARK_COLOR_COMMAND);
  }

  onAddColor = (color: string) => {
    const evt: AddCustomDarkColorEvent = {
      color,
    };
    this.editor.dispatch("DarkColor:addCustomColor", evt);
  };

  static get requires() {
    return [ContextualBalloon, DarkColorEditing];
  }
}

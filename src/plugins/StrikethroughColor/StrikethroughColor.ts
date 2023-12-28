import CanvasflowEditor, { Colors } from "../../BaseEditor";
import { Locale } from "@ckeditor/ckeditor5-utils";
import { StrikethroughColorEditing } from "./StrikethroughColorEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";
import { ContextualBalloon } from "@ckeditor/ckeditor5-ui";
import { AddCustomTextColorEvent } from "./StrikethroughColorEvents";
import {
  ColorView,
  ColorViewer,
  ColorViewerType,
} from "../../views/ColorView/ColorView";
import {
  SET_TEXT_COLOR_COMMAND,
  CLEAR_TEXT_COLOR_COMMAND,
} from "./StrikethroughColorCommands";

export class StrikethroughColor extends Plugin implements ColorViewer {
  static viewName = "cf-text-color";
  selectedColor: string = "";
  editor: CanvasflowEditor;
  locale?: Locale;
  attribute: ColorViewerType = "fontColor";
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
    this.editor.ui.componentFactory.add(StrikethroughColor.viewName, () => {
      const view = new ColorView(this);
      const querySelector = `[data-cke-tooltip-text="Text Color"]`;
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
    this.editor.execute(SET_TEXT_COLOR_COMMAND, color);
    this.view.setGridsSelectedColor(color);
  };

  onClearColor() {
    this.editor.execute(CLEAR_TEXT_COLOR_COMMAND);
  }

  onAddColor = (color: string) => {
    const evt: AddCustomTextColorEvent = {
      color,
    };
    //this.editor.dispatch("textColor:addCustomColor", evt);
  };

  static get requires() {
    return [ContextualBalloon, StrikethroughColorEditing];
  }
}

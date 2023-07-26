import CanvasflowEditor, { Colors } from "../../BaseEditor";
import { Locale } from "@ckeditor/ckeditor5-utils";
import { TextColorEditing } from "./TextColorEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";
import { ContextualBalloon } from "@ckeditor/ckeditor5-ui";
import { AddCustomTextColorEvent } from "./TextColorEvents";
import {
  ColorView,
  ColorViewer,
  ColorViewerType,
} from "../../views/ColorView/ColorView";
import {
  SET_TEXT_COLOR_COMMAND,
  CLEAR_TEXT_COLOR_COMMAND,
} from "./TextColorCommands";

export class TextColor extends Plugin implements ColorViewer {
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
    this.editor.ui.componentFactory.add(TextColor.viewName, () => this.view);
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
    this.editor.dispatch("textColor:addCustomColor", evt);
  };

  static get requires() {
    return [ContextualBalloon, TextColorEditing];
  }
}

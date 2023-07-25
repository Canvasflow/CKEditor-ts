import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { ContextualBalloon } from "@ckeditor/ckeditor5-ui";

import {
  ColorView,
  ColorViewer,
  ColorViewerType,
} from "../../views/ColorView/ColorView";
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
  view: ColorView;
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

    this.view = new ColorView(this);
    this.editor.ui.componentFactory
      .add(FontBackgroundUI.viewName, () => this.view);
  }

  static get requires() {
    return [ContextualBalloon];
  }

  onSetColor = (color: string) => {
    this.editor.execute(SET_BACKGROUND_COLOR_COMMAND, color);
    this.view.setGridsSelectedColor(color);
  };

  onClearColor() {
    this.editor.execute(CLEAR_BACKGROUND_COLOR_COMMAND);
  }

  onAddColor = (color: string) => {
    const evt: AddCustomFontBackgroundEvent = {
      color,
    };
    this.editor.dispatch("colors:addCustomBackgroundColor", evt);
  }
}

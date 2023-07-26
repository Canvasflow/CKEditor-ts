import CanvasflowEditor, { Colors } from "../../BaseEditor";
import { Locale } from "@ckeditor/ckeditor5-utils";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { ContextualBalloon } from "@ckeditor/ckeditor5-ui";
import {
  ColorView,
  ColorViewer,
  ColorViewerType,
} from "../../views/ColorView/ColorView";
import { AddCustomHighlightColorEvent } from "./HighlightColorEvents";
import { FontBackgroundEditing } from "./HighlightColorEditing";
import {
  SET_HIGHLIGHT_COLOR_COMMAND,
  CLEAR_HIGHLIGHT_COLOR_COMMAND,
} from "./HighlightColorCommands";

export class HighlightColor extends Plugin implements ColorViewer {
  static viewName = "cf-hightlight-color";
  selectedColor: string = "";
  editor: CanvasflowEditor;
  view: ColorView;
  locale?: Locale;
  attribute: ColorViewerType = "highlightColor";
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

    this.editor.ui.componentFactory.add(HighlightColor.viewName, () => {
      const view = new ColorView(this);
      const querySelector = `[data-cke-tooltip-text="Highlight Color"]`;
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

  static get requires() {
    return [ContextualBalloon, FontBackgroundEditing];
  }

  onSetColor = (color: string) => {
    this.editor.execute(SET_HIGHLIGHT_COLOR_COMMAND, color);
    this.view.setGridsSelectedColor(color);
  };

  onClearColor() {
    this.editor.execute(CLEAR_HIGHLIGHT_COLOR_COMMAND);
  }

  onAddColor = (color: string) => {
    const evt: AddCustomHighlightColorEvent = {
      color,
    };
    this.editor.dispatch("highlightColor:addCustomColor", evt);
  };
}

import CanvasflowEditor, { Colors } from "../../BaseEditor";
import { Locale } from "@ckeditor/ckeditor5-utils";
import { StrikethroughColorEditing } from "./StrikethroughColorEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";
import { ContextualBalloon } from "@ckeditor/ckeditor5-ui";

import {
  ColorView,
  ColorViewer,
  ColorViewerType,
} from "../../views/ColorView/ColorView";
import {
  STRIKETHROUGH_COLOR_ATTR,
  SET_STRIKETHROUGH_TEXT_COLOR_COMMAND,
  CLEAR_STRIKETHROUGH_TEXT_COLOR_COMMAND,
} from "./StrikethroughColorCommands";

export class StrikethroughColor extends Plugin implements ColorViewer {
  static viewName = "cf-strikethrough-color";
  selectedColor: string = "";
  editor: CanvasflowEditor;
  locale?: Locale;
  attribute: ColorViewerType = "strikethroughColor";
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
      this.applyAttribute();
      const view = new ColorView(this);
      const querySelector = `[data-cke-tooltip-text="Striketrough"]`;
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

  applyAttribute = () => {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;

    model.change((writer) => {
      const ranges = model.schema.getValidRanges(
        selection.getRanges(),
        STRIKETHROUGH_COLOR_ATTR,
      );

      for (const range of ranges) {
        const attr: any = {};
        attr[STRIKETHROUGH_COLOR_ATTR] = "black";
        writer.setAttributes(attr, range);
      }
    });
  };

  renderView = () => {
    return this.view;
  };

  onSetColor = (color: string) => {
    this.editor.execute(SET_STRIKETHROUGH_TEXT_COLOR_COMMAND, color);
    this.view.setGridsSelectedColor(color);
  };

  onClearColor() {
    this.editor.execute(CLEAR_STRIKETHROUGH_TEXT_COLOR_COMMAND);
  }

  onAddColor = () => {
    //this.editor.dispatch("textColor:addCustomColor", evt);
  };

  static get requires() {
    return [ContextualBalloon, StrikethroughColorEditing];
  }
}

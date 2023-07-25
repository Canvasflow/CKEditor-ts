import { Plugin } from "@ckeditor/ckeditor5-core";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

import { CapitalizeEditing } from "./CapitalizeEditing";

import CanvasflowEditor from "../../BaseEditor";
import { TEXT_TRANSFORM_COMMAND } from "../../commands/TextTransform/TextTransformCommand";

export class Capitalize extends Plugin {
  static viewName = "cf-capitalize";
  declare editor: CanvasflowEditor;

  init() {
    this.editor.ui.componentFactory.add(Capitalize.viewName, this.renderView);
  }

  renderView = () => {
    const button = new ButtonView();
    button.label = "Capitalize";
    button.tooltip = false;
    button.withText = true;

    this.listenTo(button, "execute", () => {
      this.editor.execute(TEXT_TRANSFORM_COMMAND, "capitalize");
    });
    return button;
  }

  static get requires() {
    return [CapitalizeEditing];
  }
}

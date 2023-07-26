import CanvasflowEditor from "../../BaseEditor";
import { Plugin } from "@ckeditor/ckeditor5-core";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { LowercaseEditing } from "./LowercaseEditing";
import { TEXT_TRANSFORM_COMMAND } from "../../commands/TextTransform/TextTransformCommand";

export class Lowercase extends Plugin {
  static viewName = "cf-lowercase";
  declare editor: CanvasflowEditor;

  init() {
    this.editor.ui.componentFactory.add(Lowercase.viewName, this.renderView);
  }

  renderView = () => {
    const button = new ButtonView();
    button.label = "Lowercase";
    button.tooltip = false;
    button.withText = true;

    this.listenTo(button, "execute", () => {
      this.editor.execute(TEXT_TRANSFORM_COMMAND, "lowercase");
    });
    return button;
  };

  static get requires() {
    return [LowercaseEditing];
  }
}

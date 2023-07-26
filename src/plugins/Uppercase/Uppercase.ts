import CanvasflowEditor from "../../BaseEditor";
import { Plugin } from "@ckeditor/ckeditor5-core";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { UppercaseEditing } from "./UppercaseEditing";
import { TEXT_TRANSFORM_COMMAND } from "../../commands/TextTransform/TextTransformCommand";

export class Uppercase extends Plugin {
  static viewName = "cf-uppercase";
  declare editor: CanvasflowEditor;

  init() {
    this.editor.ui.componentFactory.add(Uppercase.viewName, this.renderView);
  }

  renderView = () => {
    const button = new ButtonView();
    button.label = "Uppercase";
    button.tooltip = false;
    button.withText = true;
    button.class = "alignment-list";
    this.listenTo(button, "execute", () => {
      this.editor.execute(TEXT_TRANSFORM_COMMAND, "uppercase");
    });
    return button;
  };

  static get requires() {
    return [UppercaseEditing];
  }
}

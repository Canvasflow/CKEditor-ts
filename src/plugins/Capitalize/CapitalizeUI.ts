import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import CanvasflowEditor from "../../BaseEditor";
import { TEXT_TRANSFORM_COMMAND } from "../TextTransform/TextTransformCommand";
export class CapitalizeUI extends Plugin {
  declare editor: CanvasflowEditor;
  balloon: any;
  formView: any;

  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("Capitalize", () => {
      return this.createButton();
    });
  }

  private createButton() {
    const button = new ButtonView();
    button.label = "Capitalize";
    button.tooltip = false;
    button.withText = true;

    this.listenTo(button, "execute", () => {
      this.editor.execute(TEXT_TRANSFORM_COMMAND, "capitalize");
    });
    return button;
  }
}

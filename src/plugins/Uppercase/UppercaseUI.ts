import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import CanvasflowEditor from "../../BaseEditor";
import icon from "./UppercaseIcon.svg?raw";
export class UppercaseUI extends Plugin {
  declare editor: CanvasflowEditor;
  balloon: any;
  formView: any;

  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("Uppercase", () => {
      return this.createButton();
    });
  }

  private createButton() {
    const button = new ButtonView();
    button.label = "Uppercase";
    button.tooltip = true;
    button.withText = false;
    button.icon = icon;
    this.listenTo(button, "execute", () => {
      this.editor.execute("uppercase");
    });
    return button;
  }
}

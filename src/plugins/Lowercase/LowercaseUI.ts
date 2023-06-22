import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import CanvasflowEditor from "../../BaseEditor";
import icon from "./LowercaseIcon.svg?raw";

export class LowercaseUI extends Plugin {
  declare editor: CanvasflowEditor;
  balloon: any;

  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("Lowercase", () => {
      return this.createButton();
    });
  }

  private createButton() {
    const button = new ButtonView();
    button.label = "Lowercase";
    button.tooltip = true;
    button.withText = false;
    button.icon = icon;
    this.listenTo(button, "execute", () => {
      this.editor.execute("lowercase");
    });
    return button;
  }
}

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import CanvasflowEditor from "../../BaseEditor";
import icon from "../../assets/icons/clearFormatting.svg?raw";
export class ClearFormattingUI extends Plugin {
  declare editor: CanvasflowEditor;
  balloon: any;

  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("ClearFormatting", () => {
      return this.createButton();
    });
  }

  private createButton() {
    const button = new ButtonView();
    button.label = "Clear Format";
    button.tooltip = true;
    button.withText = false;
    button.icon = icon;
    this.listenTo(button, "execute", () => {
      this.editor.execute("clear");
    });
    return button;
  }
}

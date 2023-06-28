import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import CanvasflowEditor from "../../BaseEditor";
export class UppercaseUI extends Plugin {
  declare editor: CanvasflowEditor;
  balloon: any;

  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("Uppercase", () => {
      return this.createButton();
    });
  }

  private createButton() {
    const button = new ButtonView();
    button.label = "Uppercase";
    button.tooltip = false;
    button.withText = true;
    button.class = "alignment-list";
    this.listenTo(button, "execute", () => {
      this.editor.execute("uppercase");
    });
    return button;
  }
}

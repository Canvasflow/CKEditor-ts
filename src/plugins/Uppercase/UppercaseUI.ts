import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import CanvasflowEditor from "../../BaseEditor";

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
    button.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M15.246 14H8.754l-1.6 4H5l6-15h2l6 15h-2.154l-1.6-4zm-.8-2L12 5.885 9.554 12h4.892zM3 20h18v2H3v-2z"/> </g> </svg>`;
    this.listenTo(button, "execute", () => {
      this.editor.execute("uppercase");
    });
    return button;
  }
}

import { ClearFormatEditing } from "./ClearFormatEditing";
import { Plugin } from "@ckeditor/ckeditor5-core";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import CanvasflowEditor from "../../BaseEditor";
import icon from "../../assets/icons/clearFormatting.svg?raw";

export class ClearFormat extends Plugin {
  declare editor: CanvasflowEditor;
  static viewName = "cf-clear-format";
  balloon: any;

  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add(ClearFormat.viewName, this.renderView);
  }

  renderView = () => {
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

  static get requires() {
    return [ClearFormatEditing];
  }
}

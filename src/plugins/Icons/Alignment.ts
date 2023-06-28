import { Plugin } from "ckeditor5/src/core";
import icon from "../../assets/icons/alignment.svg?raw";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import CanvasflowEditor from "../../BaseEditor";

import AlignmentEditing from "@ckeditor/ckeditor5-alignment/src/alignmentediting";
import AlignmentUI from "@ckeditor/ckeditor5-alignment/src/alignmentui";

export default class Alignment extends Plugin {
  declare editor: CanvasflowEditor;

  //static get requires(){ return readonly [typeof AlignmentEditing, typeof AlignmentUI]}
  static get pluginName() {
    return "Alignment";
  }

  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("alignment", () => {
      return this.createButton();
    });
  }

  private createButton() {
    const button = new ButtonView();
    button.icon = icon;
    return button;
  }
}

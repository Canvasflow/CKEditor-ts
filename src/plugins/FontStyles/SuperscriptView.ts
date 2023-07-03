import { ButtonView } from "@ckeditor/ckeditor5-ui";
import icon from "./../../assets/icons/superscript.svg?raw";
import { FontStylesViewer } from "./FontStylesViewer";

export class SuperscriptView extends ButtonView {
  static viewName = "SuperscriptCF";
  constructor(viewer: FontStylesViewer) {
    super(viewer.editor.locale);
    this.label = "Superscript";
    this.icon = icon;
    this.tooltip = true;
    this.withText = false;
    this.listenTo(this, "execute", () => {
      viewer.onClickSuperscript();
    });
  }
}

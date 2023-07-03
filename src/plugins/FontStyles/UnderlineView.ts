import { ButtonView } from "@ckeditor/ckeditor5-ui";
import icon from "./../../assets/icons/underline.svg?raw";
import { FontStylesViewer } from "./FontStylesViewer";

export class UnderlineView extends ButtonView {
  static viewName = "UnderlineCF";
  constructor(viewer: FontStylesViewer) {
    super(viewer.editor.locale);
    this.label = "Underline";
    this.icon = icon;
    this.tooltip = true;
    this.withText = false;
    this.listenTo(this, "execute", () => {
      viewer.onClickUnderline();
    });
  }
}

import { ButtonView } from "@ckeditor/ckeditor5-ui";
import icon from "./../../assets/icons/subscript.svg?raw";
import { FontStylesViewer } from "./FontStylesViewer";

export class SubscriptView extends ButtonView {
  static viewName = "SubscriptCF";
  constructor(viewer: FontStylesViewer) {
    super(viewer.editor.locale);
    this.label = "Subscript";
    this.icon = icon;
    this.tooltip = true;
    this.withText = false;
    this.listenTo(this, "execute", () => {
      viewer.onClickSubscript();
    });
  }
}

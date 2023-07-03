import { ButtonView } from "@ckeditor/ckeditor5-ui";
import icon from "./../../assets/icons/striketrough.svg?raw";
import { FontStylesViewer } from "./FontStylesViewer";

export class StrikethroughView extends ButtonView {
  static viewName = "StrikethroughCF";
  constructor(viewer: FontStylesViewer) {
    super(viewer.editor.locale);
    this.label = "Strikethrough";
    this.icon = icon;
    this.tooltip = true;
    this.withText = false;
    this.listenTo(this, "execute", () => {
      viewer.onClickStrikethroug();
    });
  }
}

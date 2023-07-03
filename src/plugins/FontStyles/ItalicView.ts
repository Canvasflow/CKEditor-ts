import { ButtonView } from "@ckeditor/ckeditor5-ui";

import icon from "./../../assets/icons/italic.svg?raw";

import { FontStylesViewer } from "./FontStylesViewer";

export class ItalicView extends ButtonView {
  static viewName = "ItalicCF";
  constructor(viewer: FontStylesViewer) {
    super(viewer.editor.locale);
    this.label = "Italic";
    this.icon = icon;
    this.tooltip = true;
    this.withText = false;
    this.listenTo(this, "execute", () => {
      viewer.onClickItalic();
    });
  }
}

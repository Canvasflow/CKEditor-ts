import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import CanvasflowEditor from "../../BaseEditor";

import { FontStylesViewer } from "./FontStylesViewer";
import { BoldView } from "./BoldView";
import { ItalicView } from "./ItalicView";
export class FontStyles extends Plugin implements FontStylesViewer {
  declare editor: CanvasflowEditor;
  fonts: string[] = [];

  init() {
    // this.fonts = this.editor.fonts;
    // if (!this.fonts.length) {
    //   return;
    // }

    this.createBoldView();
    this.createItalicView();
  }

  private createBoldView() {
    this.editor.ui.componentFactory.add(BoldView.viewName, () => {
      return new BoldView(this);
    });
  }

  private createItalicView() {
    this.editor.ui.componentFactory.add(ItalicView.viewName, () => {
      return new ItalicView(this);
    });
  }

  onClickBold = () => {
    this.editor.execute("bold");
  };

  onClickItalic = () => {
    this.editor.execute("italic");
  };
}

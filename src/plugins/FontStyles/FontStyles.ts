import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import CanvasflowEditor from "../../BaseEditor";

import { FontStylesViewer } from "./FontStylesViewer";
import { BoldView } from "./BoldView";
import { ItalicView } from "./ItalicView";
import { UnderlineView } from "./UnderlineView";
import { StrikethroughView } from "./StrikethroughView";
import { SubscriptView } from "./SubscriptView";
import { SuperscriptView } from "./SuperscriptView";

export class FontStyles extends Plugin implements FontStylesViewer {
  declare editor: CanvasflowEditor;

  init() {
    this.createBoldView();
    this.createItalicView();
    this.createUnderlineView();
    this.createStrikethroughView();
    this.createSubscriptView();
    this.createSuperscriptView();
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

  private createUnderlineView() {
    this.editor.ui.componentFactory.add(UnderlineView.viewName, () => {
      return new UnderlineView(this);
    });
  }

  private createStrikethroughView() {
    this.editor.ui.componentFactory.add(StrikethroughView.viewName, () => {
      return new StrikethroughView(this);
    });
  }

  private createSubscriptView() {
    this.editor.ui.componentFactory.add(SubscriptView.viewName, () => {
      return new SubscriptView(this);
    });
  }

  private createSuperscriptView() {
    this.editor.ui.componentFactory.add(SuperscriptView.viewName, () => {
      return new SuperscriptView(this);
    });
  }

  onClickBold = () => {
    this.editor.execute("bold");
  };

  onClickItalic = () => {
    this.editor.execute("italic");
  };

  onClickUnderline = () => {
    this.editor.execute("underline");
  };

  onClickStrikethroug = () => {
    this.editor.execute("strikethrough");
  };

  onClickSubscript = () => {
    this.editor.execute("subscript");
  };

  onClickSuperscript = () => {
    this.editor.execute("superscript");
  };
}

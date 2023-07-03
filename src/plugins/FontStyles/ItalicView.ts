import { ButtonView } from "@ckeditor/ckeditor5-ui";
import icon from "./../../assets/icons/italic.svg?raw";
import { FontStylesViewer } from "./FontStylesViewer";
import CanvasflowEditor from "../../BaseEditor";

export class ItalicView extends ButtonView {
  private editor: CanvasflowEditor;
  static viewName = "ItalicCF";
  constructor(viewer: FontStylesViewer) {
    super(viewer.editor.locale);
    const { editor } = viewer;
    this.label = "Italic";
    this.icon = icon;
    this.tooltip = true;
    this.withText = false;
    this.class = "";
    this.editor = editor;
    this.listenTo(this, "execute", () => {
      viewer.onClickItalic();
    });
    this.init();
  }

  private init() {
    const { model } = this.editor;
    const { document } = model;
    document.selection.on("change:range", this.onSelectionChange);
  }

  private onSelectionChange = () => {
    const { selection } = this.editor.model.document;
    if (!selection) {
      return;
    }
    const range = selection.getFirstRange();
    if (!range) {
      return;
    }

    for (const item of range.getItems()) {
      if (item.hasAttribute("italic")) {
        this.class = "ck-on";
        return;
      }
      this.class = "";
    }
  };
}

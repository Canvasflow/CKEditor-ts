import CanvasflowEditor from "../../BaseEditor";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { FontStylesViewer, hasAttribute } from "./FontStylesViewer";
import { getIcon } from "../../icons/icons";

export class ItalicView extends ButtonView {
  private editor: CanvasflowEditor;
  static viewName = "cf-italic";
  constructor(viewer: FontStylesViewer) {
    super(viewer.editor.locale);
    const { editor } = viewer;
    this.label = "Italic";
    this.icon = getIcon("italic");
    this.tooltip = true;
    this.withText = false;
    this.class = "";
    this.editor = editor;
    this.listenTo(this, "execute", () => {
      this.class = "ck-on";
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
    if (
      hasAttribute({
        editor: this.editor,
        attribute: "italic",
      })
    ) {
      this.class = "ck-on";
      return;
    }
    this.class = "";
  };
}

import CanvasflowEditor from "../../BaseEditor";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { FontStylesViewer, hasAttribute } from "./FontStylesViewer";
import { getIcon } from "../../icons/icons";

export class UnderlineView extends ButtonView {
  private editor: CanvasflowEditor;
  static viewName = "cf-underline";
  constructor(viewer: FontStylesViewer) {
    super(viewer.editor.locale);
    const { editor } = viewer;
    this.label = "Underline";
    this.icon = getIcon("underline");
    this.tooltip = true;
    this.withText = false;
    this.editor = editor;
    this.listenTo(this, "execute", () => {
      this.class = "ck-on";
      viewer.onClickUnderline();
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
        attribute: "underline",
      })
    ) {
      this.class = "ck-on";
      return;
    }
    this.class = "";
  };
}

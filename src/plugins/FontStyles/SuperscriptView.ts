import { ButtonView } from "@ckeditor/ckeditor5-ui";
import icon from "./../../assets/icons/superscript.svg?raw";
import { FontStylesViewer, hasAttribute } from "./FontStylesViewer";
import CanvasflowEditor from "../../BaseEditor";

export class SuperscriptView extends ButtonView {
  private editor: CanvasflowEditor;
  static viewName = "cf-superscript";
  constructor(viewer: FontStylesViewer) {
    super(viewer.editor.locale);
    const { editor } = viewer;
    this.label = "Superscript";
    this.icon = icon;
    this.tooltip = true;
    this.withText = false;
    this.editor = editor;
    this.listenTo(this, "execute", () => {
      this.class = "ck-on";
      viewer.onClickSuperscript();
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
        attribute: "superscript",
      })
    ) {
      this.class = "ck-on";
      return;
    }
    this.class = "";
  };
}

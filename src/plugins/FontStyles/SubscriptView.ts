import CanvasflowEditor from "../../BaseEditor";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { FontStylesViewer, hasAttribute } from "./FontStylesViewer";
import { getIcon } from "../../icons/icons";

export class SubscriptView extends ButtonView {
  private editor: CanvasflowEditor;
  static viewName = "cf-subscript";
  constructor(viewer: FontStylesViewer) {
    super(viewer.editor.locale);
    const { editor } = viewer;
    this.label = "Subscript";
    this.icon = getIcon("subscript");
    this.tooltip = true;
    this.withText = false;
    this.editor = editor;
    this.listenTo(this, "execute", () => {
      this.class = "ck-on";
      viewer.onClickSubscript();
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
        attribute: "subscript",
      })
    ) {
      this.class = "ck-on";
      return;
    }
    this.class = "";
  };
}

import CanvasflowEditor from "../../BaseEditor";
import { ContextualBalloon } from "@ckeditor/ckeditor5-ui";
import { Plugin } from "@ckeditor/ckeditor5-core";
import { TitleEditorViewer } from "./TitleEditorView";
import { TitlePopupView } from "./TitlePopupView";
import { TitleEditorEditing } from "./TitleEditorEditing";
import {
  TITLE_EDITOR_CLEAR,
  TITLE_EDITOR_COMMAND,
} from "./TitleEditorCommands";

export class TitleEditor extends Plugin implements TitleEditorViewer {
  static viewName = "cf-title-editor";
  declare editor: CanvasflowEditor;
  titleValue: any;
  titleEditorPopup: any;

  constructor(editor: CanvasflowEditor) {
    super(editor);
    const { model } = this.editor;
    const { document } = model;
    document.selection.on("change:range", this.onSelectionChange);
    this.titleEditorPopup = new TitlePopupView(this);

    this.editor.ui.componentFactory.add(TitleEditor.viewName, () => {
      this.titleEditorPopup.showView();
      this.listenTo(
        this.titleEditorPopup.removeTitleButtonView,
        "execute",
        () => {
          console.log("execute called");
          this.editor.execute(TITLE_EDITOR_CLEAR);
          this.titleEditorPopup.updateTitle("");
        },
      );

      this.listenTo(this.titleEditorPopup, "submit", () => {
        this.editor.execute(
          TITLE_EDITOR_COMMAND,
          this.titleEditorPopup.titleCreatorView.titleValue,
        );
        this.titleEditorPopup.updateTitle(
          this.titleEditorPopup.titleCreatorView.titleValue,
        );
        this.titleEditorPopup.titleCreatorView.onChange("");
      });
      return this.titleEditorPopup;
    });
  }

  onSelectionChange = () => {
    const { selection } = this.editor.model.document;
    if (!selection) {
      return;
    }
    const range = selection.getFirstRange();
    if (!range) {
      return;
    }
    let title: any = "";
    for (const item of range.getItems()) {
      if (item.hasAttribute("title")) {
        title = item.getAttribute("title");
        continue;
      }
    }
    this.titleEditorPopup.updateTitle(title);
  };

  static get requires() {
    return [ContextualBalloon, TitleEditorEditing];
  }
}

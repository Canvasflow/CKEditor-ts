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
  selectedTitle: any = null;
  selectedText: any = null;
  selectedItem: any;

  constructor(editor: CanvasflowEditor) {
    super(editor);
    const { model } = this.editor;
    const { document } = model;
    document.selection.on("change:range", this.onSelectionChange);
    this.titleEditorPopup = new TitlePopupView(this);

    this.editor.ui.componentFactory.add(TitleEditor.viewName, () => {
      this.titleEditorPopup.showView();
      this.listenTo(
        this.titleEditorPopup.titleUpdateView.removeTitleButtonView,
        "execute",
        () => {
          this.editor.execute(TITLE_EDITOR_CLEAR, this.selectedItem);
          this.titleEditorPopup.items.clear();
        },
      );

      this.listenTo(
        this.titleEditorPopup.titleUpdateView.updateTitleButtonView,
        "execute",
        () => {
          this.editor.execute(
            TITLE_EDITOR_COMMAND,
            this.titleEditorPopup.titleUpdateView.titleValue,
          );
          this.titleEditorPopup.items.clear();
        },
      );

      this.listenTo(
        this.titleEditorPopup.titleCreatorView.addLinkButtonView,
        "execute",
        () => {
          this.editor.execute(
            TITLE_EDITOR_COMMAND,
            this.titleEditorPopup.titleCreatorView.titleValue,
          );
          this.titleEditorPopup.items.clear();
          // this.titleEditorPopup.updateTitle(
          //   this.titleEditorPopup.titleCreatorView.titleValue,
          //   false,
          // );
          // this.titleEditorPopup.titleCreatorView.onChange("");
        },
      );
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

    let valueElement: any;
    let titlesFound = 0;

    for (const value of range.getWalker()) {
      if (value.item.getAttribute("title")) {
        titlesFound++;
        if (titlesFound > 1) {
          valueElement = null;
          this.selectedTitle = null;
        } else {
          valueElement = JSON.parse(JSON.stringify(value.item));
          this.selectedItem = value.item;
          this.selectedTitle = valueElement.textNode.attributes.title || null;
          this.selectedText = valueElement.textNode.data || null;
        }
      }
    }

    let title: any = "";
    for (const item of range.getItems()) {
      if (item.hasAttribute("title")) {
        title = item.getAttribute("title");
        continue;
      }
    }
    if (title) {
      this.titleEditorPopup.updateTitleView(title);
    } else {
      this.titleEditorPopup.createTitle();
    }
  };

  static get requires() {
    return [ContextualBalloon, TitleEditorEditing];
  }
}

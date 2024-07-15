import CanvasflowEditor from "../../BaseEditor";
import {
  View,
  ButtonView,
  submitHandler,
  LabelView,
  ViewCollection,
} from "@ckeditor/ckeditor5-ui";
import { FocusTracker, Locale } from "@ckeditor/ckeditor5-utils";
import { TitleEditorComponentView } from "./TitleEditorComponent";
import { getIcon } from "../../icons/icons";
import { TitleEditorView } from "./TitleEditorView";

export class TitlePopupView extends View {
  declare editor: CanvasflowEditor;
  declare titleValue: string;
  private items: ViewCollection;
  private focusTracker: FocusTracker;
  removeTitleButtonView: ButtonView;
  private titleCreatorView: TitleEditorView;
  // EditTitleButtonView: ButtonView;

  currentValue: string = "";
  titleView: TitleEditorComponentView;
  locale: Locale;

  constructor(viewer: TitlePopupViewer) {
    super(viewer.locale);
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.editor = viewer.editor;
    this.locale = this.editor.locale;
    this.titleView = new TitleEditorComponentView(this);
    this.removeTitleButtonView = this.createRemoveButton(
      "",
      "remove-title-button",
    );
    this.titleValue = viewer.titleValue;
    this.titleCreatorView = new TitleEditorView(this);
  }

  updateTitle(title: string) {
    this.initItems(title);
  }

  private initItems(title: string) {
    this.items.clear();
    if (title.length === 0 || !title) {
      //this.addTitle("No title selected");

      this.items.addMany(this.titleCreatorView.items);
    } else {
      this.addTitle("Selected Title");
      this.addTitle(title);
      this.items.add(this.removeTitleButtonView);
      //this.items.add(this.createAddButton());
    }
  }

  onChange = (value: string) => {
    this.titleValue = value;
  };
  createAddButton() {
    const removeButtonView = this.createButtonObject(
      "Remove",
      "",
      "remove-title-button",
    );

    // addLinkButtonView.type = "execute";
    removeButtonView.isEnabled = true;
    return removeButtonView;
  }

  private addTitle(title: string) {
    this.items.add(this.createLabel(title));
  }

  private createRemoveButton(icon: string, className: string) {
    const removeTitleButtonView = this.createButtonObject(
      "Remove",
      "",
      className,
    );
    removeTitleButtonView.withText = true;
    return removeTitleButtonView;
  }

  render() {
    super.render();
    submitHandler({
      view: this,
    });
  }

  // destroy() {
  //   super.destroy();
  //   this.focusTracker.destroy();
  // }

  private createButtonObject(label: any, icon: any, className: any) {
    const button = new ButtonView();
    button.set({
      label,
      icon,
      tooltip: true,
      class: className,
      withText: true,
    });

    return button;
  }

  private createLabel(text: any) {
    const labelView = new LabelView(this.locale);
    labelView.text = text;
    labelView.extendTemplate({
      attributes: {
        class: ["ck", "ck-title-popup_label"],
      },
    });
    return labelView;
  }

  /**
   * Insert elements into DOM
   *
   */
  showView() {
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-page", "title-editor-page"],
      },
      children: this.items,
    });
  }
}

export interface TitlePopupViewer {
  titleValue: string;
  locale?: Locale;
  editor: CanvasflowEditor;
}

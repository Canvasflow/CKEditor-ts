import CanvasflowEditor from "../../BaseEditor";
import {
  View,
  ButtonView,
  submitHandler,
  LabelView,
  ViewCollection,
} from "@ckeditor/ckeditor5-ui";
import { Locale } from "@ckeditor/ckeditor5-utils";
import { TitleEditorComponentView } from "./TitleEditorComponent";
import { TitleEditorView } from "./TitleEditorView";
import { TitleUpdateView } from "./TitleUpdateView";

export class TitlePopupView extends View {
  declare editor: CanvasflowEditor;
  declare titleValue: string;
  private items: ViewCollection;

  private titleCreatorView!: TitleEditorView;
  private titleUpdateView!: TitleUpdateView;

  removeTitleButtonView: ButtonView;
  updateTitleButtonView: ButtonView;

  currentValue: string = "";
  titleView: TitleEditorComponentView;
  locale: Locale;

  popupTitle: LabelView;

  constructor(viewer: TitlePopupViewer) {
    super(viewer.locale);
    this.items = this.createCollection();
    this.editor = viewer.editor;
    this.locale = this.editor.locale;
    this.titleView = new TitleEditorComponentView(this);
    this.removeTitleButtonView = this.createButton(
      "remove-title-button",
      "Remove",
    );
    this.updateTitleButtonView = this.createButton(
      "update-title-button",
      "Save",
    );
    this.titleValue = viewer.titleValue;
    this.popupTitle = this.createLabel("Update Title");
    this.titleUpdateView = new TitleUpdateView(this, "");
    this.titleCreatorView = new TitleEditorView(this);
  }

  createTitle() {
    this.items.clear();
    this.items.addMany(this.titleCreatorView.items);
  }

  updateTitleView(title: string) {
    this.titleUpdateView.titleView.set("value", title);
    this.items.clear();
    this.items.addMany(this.titleUpdateView.items);
  }

  clearTitle() {
    this.titleCreatorView.renderTitleInput();
  }

  onChange = (value: string) => {
    this.titleValue = value;
  };

  private createButton(className: string, label: string) {
    const button = this.createButtonObject(label, "", className);
    button.withText = true;
    return button;
  }

  render() {
    super.render();
    submitHandler({
      view: this,
    });
  }

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

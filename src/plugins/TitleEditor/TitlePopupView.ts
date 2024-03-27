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

export class TitlePopupView extends View {
  declare editor: CanvasflowEditor;
  private items: ViewCollection;
  private focusTracker: FocusTracker;
  private removeTitleButtonView?: ButtonView;
  declare titleValue: string;

  titleInput: any;
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
    this.initItems();
  }

  private initItems() {
    this.addTitle();
    this.createButton(getIcon("remove"), "remove-title-button");
    this.createButton(getIcon("edit"), "edit-title-button");
  }

  onChange = (value: string) => {
    this.titleValue = value;
  };

  private addTitle() {
    const label = "Title Value";
    this.items.add(this.createLabel(label));
  }

  private createButton(icon: string, className: string) {
    this.removeTitleButtonView = this.createButtonObject("", icon, className);
    this.removeTitleButtonView.withText = false;
    this.removeTitleButtonView.type = "submit";
    this.removeTitleButtonView.isEnabled = true;
    this.items.add(this.removeTitleButtonView);
  }

  render() {
    super.render();
    submitHandler({
      view: this,
    });
  }

  destroy() {
    super.destroy();
    this.focusTracker.destroy();
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
        class: ["ck", "ck-page", "title-popup-page"],
      },
      children: this.items,
    });
  }
}

export interface TitlePopupViewer {
  locale?: Locale;
  editor: CanvasflowEditor;
}

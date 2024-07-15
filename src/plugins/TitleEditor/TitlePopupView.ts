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
  declare titleValue: string;
  private items: ViewCollection;
  private focusTracker: FocusTracker;
  removeTitleButtonView: ButtonView;
  EditTitleButtonView: ButtonView;

  currentValue: string = "";
  titleView: TitleEditorComponentView;
  locale: Locale;

  constructor(viewer: TitlePopupViewer) {
    super(viewer.locale);
    console.log(title);
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.editor = viewer.editor;
    this.locale = this.editor.locale;
    this.titleView = new TitleEditorComponentView(this);
    this.removeTitleButtonView = this.createRemoveButton(
      getIcon("remove"),
      "remove-title-button",
    );
    this.EditTitleButtonView = this.createEditButton(
      getIcon("edit"),
      "edit-title-button",
    );
    this.initItems();
  }

  private initItems() {
    this.addTitle();

    this.items.add(this.removeTitleButtonView);
  }

  onChange = (value: string) => {
    this.titleValue = value;
  };

  private addTitle() {
    const label = "Title Value";
    this.items.add(this.createLabel(label));
  }

  private createRemoveButton(icon: string, className: string) {
    const removeTitleButtonView = this.createButtonObject("", icon, className);
    removeTitleButtonView.withText = false;

    // this.listenTo(removeTitleButtonView, "execute", () => {
    //   console.log("remove button called");
    // });

    return removeTitleButtonView;
  }

  private createEditButton(icon: string, className: string) {
    const EditTitleButtonView = this.createButtonObject("", icon, className);
    EditTitleButtonView.withText = false;

    this.listenTo(EditTitleButtonView, "execute", () => {
      console.log("edit button called");
      this.destroy();
    });

    return EditTitleButtonView;
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

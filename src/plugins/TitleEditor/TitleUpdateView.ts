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

export class TitleUpdateView extends View {
  declare editor: CanvasflowEditor;
  private focusTracker: FocusTracker;
  items: ViewCollection;

  titleView: TitleEditorComponentView;
  locale: Locale;
  removeTitleButtonView: ButtonView;
  updateTitleButtonView: ButtonView;

  declare titleValue: string;
  titleInput: any;
  currentValue: string = "";

  constructor(viewer: TitleEditorViewer, title: string) {
    super(viewer.locale);
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.editor = viewer.editor;
    this.locale = this.editor.locale;
    this.titleView = new TitleEditorComponentView(this);
    this.titleView.set("value", title);
    this.removeTitleButtonView = this.createButtonObject(
      "Remove",
      "",
      "remove-title-button",
    );
    this.updateTitleButtonView = this.createButtonObject(
      "Save",
      "",
      "add-title-button",
    );
    this.initItems(title);
  }

  initItems(title: string) {
    this.titleView = new TitleEditorComponentView(this);
    this.titleView.set("value", title);
    this.addTitle();
    this.items.add(this.titleView);
    this.items.add(this.removeTitleButtonView);
    this.items.add(this.updateTitleButtonView);
  }

  onChange = (value: string) => {
    this.titleValue = value;
  };

  private addTitle() {
    const label = "Update Title";
    this.items.add(this.createLabel(label));
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
        class: ["ck", "ck-title-editor_label"],
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

export interface TitleEditorViewer {
  locale?: Locale;
  editor: CanvasflowEditor;
}

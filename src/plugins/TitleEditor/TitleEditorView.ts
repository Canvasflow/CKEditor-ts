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

export class TitleEditorView extends View {
  declare editor: CanvasflowEditor;
  declare titleValue: string;
  private focusTracker: FocusTracker;
  private addLinkButtonView?: ButtonView;
  items: ViewCollection;

  titleInput: any;
  titleView!: TitleEditorComponentView;
  locale: Locale;

  constructor(viewer: TitleEditorViewer) {
    super(viewer.locale);
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.editor = viewer.editor;
    this.locale = this.editor.locale;
    this.titleView = new TitleEditorComponentView(this);
    this.initItems();
  }

  initItems() {
    this.addTitle();
    this.createAddButton();
    this.items.add(this.titleView);
    this.items.add(this.addLinkButtonView!);
  }

  renderTitleInput() {
    if (this.items.has(this.titleView)) {
      this.items.remove(this.titleView);
      this.titleView = new TitleEditorComponentView(this);
      this.titleView.set("value", "");
      this.items.add(this.titleView);
    }
  }

  onChange = (value: string) => {
    this.titleValue = value;
  };

  private addTitle() {
    const label = "Add Title";
    this.items.add(this.createLabel(label));
  }

  private createAddButton() {
    this.addLinkButtonView = this.createButtonObject(
      "Add",
      "",
      "add-title-button",
    );

    this.addLinkButtonView.isEnabled = true;
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

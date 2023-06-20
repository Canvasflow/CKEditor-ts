import {
  View,
  ButtonView,
  submitHandler,
  LabelView,
  createDropdown,
  Model,
  addListToDropdown,
  ViewCollection,
  DropdownView,
  LabeledFieldView,
  createLabeledInputText,
} from "@ckeditor/ckeditor5-ui";
import { FocusTracker, Collection, Locale } from "@ckeditor/ckeditor5-utils";
import { icons } from "@ckeditor/ckeditor5-core";
import { SwitchButtonView } from "@ckeditor/ckeditor5-ui";

export class ExternalLinkView extends View {
  private focusTracker: FocusTracker;
  private items: ViewCollection;
  private viewer: ExternalLinkViewer;
  saveButtonView: any;
  cancelButtonView: any;
  newTab?: SwitchButtonView;
  protocol?: SwitchButtonView;

  constructor(viewer: ExternalLinkViewer) {
    super(viewer.locale);
    this.viewer = viewer;
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.initItems();
  }

  private initItems() {
    this.items.add(this.createInput("url"));
    //toggles

    this.newTab = new SwitchButtonView();

    this.newTab.set({
      label: "Open in New tab",
      withText: true,
      isOn: false,
    });

    this.protocol = new SwitchButtonView();

    this.protocol.set({
      label: "Default Protocol",
      withText: true,
      isOn: false,
    });
    this.items.add(this.newTab);
    this.items.add(this.createLabel(""));
    this.items.add(this.protocol);
    this.items.add(this.createLabel(""));
    //footer buttons
    this.saveButtonView = this.createButton(
      "Save",
      icons.check,
      "ck-button-save",
    );
    this.saveButtonView.type = "submit";
    this.items.add(this.saveButtonView);
    this.cancelButtonView = this.createButton(
      "Cancel",
      icons.cancel,
      "ck-button-cancel",
    );
    this.cancelButtonView.delegate("execute").to(this, "cancel");
    this.items.add(this.cancelButtonView);
  }

  private createLabel(text: any) {
    const labelView = new LabelView(this.locale);
    labelView.text = text;
    labelView.extendTemplate({
      attributes: {
        class: ["ck", "ck-link-label"],
      },
    });
    return labelView;
  }

  private createInput(label: string) {
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText,
    );
    labeledInput.label = label;
    return labeledInput;
  }

  private createButton(label: string, icon: string, className: string) {
    const button = new ButtonView();
    button.set({
      label,
      icon,
      tooltip: true,
      class: className,
    });
    return button;
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
  showView() {
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-page", "external-link"],
      },
      children: this.items,
    });
  }
}

export interface ExternalLinkViewer {
  locale?: Locale;
}

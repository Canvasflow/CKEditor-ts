import {
  View,
  ButtonView,
  submitHandler,
  LabelView,
  ViewCollection,
  LabeledFieldView,
  InputView,
} from "@ckeditor/ckeditor5-ui";
import { FocusTracker, Locale } from "@ckeditor/ckeditor5-utils";
import { icons } from "@ckeditor/ckeditor5-core";
import { SwitchButtonView } from "@ckeditor/ckeditor5-ui";

export class ExternalLinkView extends View {
  private focusTracker: FocusTracker;
  private items: ViewCollection;
  saveButtonView?: ButtonView;
  cancelButtonView?: ButtonView;
  newTab?: SwitchButtonView;
  protocol?: SwitchButtonView;
  input?: LabeledFieldView;

  constructor(viewer: ExternalLinkViewer) {
    super(viewer.locale);
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.initItems();
  }

  private initItems() {
    this.createInputItems();
    this.createNewTabToggle();
    this.createProtocolToggle();
    this.createButtonFooter();
  }

  private createInputItems() {
    this.items.add(this.createLabel("Link URL"));
    this.items.add(this.createInput());
    this.items.add(this.createLabel(""));
  }

  private createNewTabToggle() {
    this.items.add(this.createLabel(""));
    this.newTab = new SwitchButtonView();
    this.newTab.set({
      label: "Open in New tab",
      withText: true,
      isOn: false,
    });
    this.newTab.on("execute", () => {
      if (this.newTab) this.newTab.isOn = !this.newTab.isOn;
    });
    this.items.add(this.newTab);
  }

  private createProtocolToggle() {
    this.items.add(this.createLabel(""));
    this.protocol = new SwitchButtonView();
    this.protocol.set({
      label: "Default Protocol",
      withText: true,
      isOn: false,
    });

    this.protocol.on("execute", () => {
      if (this.protocol) this.protocol.isOn = !this.protocol.isOn;
    });
    this.items.add(this.protocol);
  }

  private createButtonFooter() {
    this.items.add(this.createLabel(""));

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

  private createLabel(text: string) {
    const labelView = new LabelView(this.locale);
    labelView.text = text;
    labelView.extendTemplate({
      attributes: {
        class: ["ck", "ck-link-label"],
      },
    });
    return labelView;
  }

  private createInput() {
    const input = new InputView(this.locale);
    input.id = "url-input";
    return input;
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

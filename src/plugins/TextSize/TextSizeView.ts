import {
  View,
  ViewCollection,
  ButtonView,
  InputView,
} from "@ckeditor/ckeditor5-ui";

import { Locale } from "@ckeditor/ckeditor5-utils";
import minus from "./minusIcon.svg?raw";
import plus from "./plusIcon.svg?raw";

export class TextSizeView extends View {
  private items: ViewCollection;
  private iconButton?: ButtonView;

  constructor(viewer: TextSizeViewer) {
    super(viewer.locale);
    this.items = this.createCollection();
    this.initItems();
  }

  private initItems() {
    this.items.add(this.createButton("", minus));
    this.items.add(this.createInput());
    this.items.add(this.createButton("", plus));
  }

  private createButton(label: string, icon: any) {
    this.iconButton = this.createButtonObject(label, icon, "");
    this.iconButton.type = "submit";
    this.iconButton.isEnabled = true;
    return this.iconButton;
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

  private createInput() {
    const input = new InputView(this.locale);
    input.id = "text-size-input";
    return input;
  }

  /**
   * Insert elements into DOM
   *
   */
  showView() {
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-page", "font-size"],
      },
      children: this.items,
    });
  }
}

export interface TextSizeViewer {
  locale?: Locale;
}

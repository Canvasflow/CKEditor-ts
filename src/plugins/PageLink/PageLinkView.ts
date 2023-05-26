import {
  View,
  ButtonView,
  submitHandler,
  InputView,
  ColorGridView,
  LabelView,
  addListToDropdown,
  createDropdown,
  Model,
} from "@ckeditor/ckeditor5-ui";

import { FocusTracker, Collection } from "@ckeditor/ckeditor5-utils";

export class PageLinkView extends View {
  columns: number | undefined;
  items: any;
  focusTracker: FocusTracker;

  constructor(locale: any) {
    super(locale);
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.items.add(this.createLabel("Insert Page Link"));
    const listDropdown = createDropdown(locale);
    listDropdown.buttonView.set({
      label: "Select Page",
      withText: true,
    });
    listDropdown.id = "dropdown-element";

    const collection = new Collection();

    //AGREGAMOS PAGINAS?
    this.items.add(listDropdown);
    this.items.add(this.createLabel(""));
    let setButton = this.createButton("Insert Link", ``, "button-blue");

    this.items.add(setButton);
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-page"],
      },
      children: this.items,
    });
  }

  render() {
    super.render();

    submitHandler({
      view: this,
    });
    this.items._items.forEach((view: { element: Element }) => {
      this.focusTracker.add(view.element);
    });
  }

  destroy() {
    super.destroy();
    this.focusTracker.destroy();
  }

  createButton(label: any, icon: any, className: any) {
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

  createLabel(text: any) {
    const labelView = new LabelView(this.locale);
    labelView.text = text;
    labelView.extendTemplate({
      attributes: {
        class: ["ck", "ck-color-grid__label"],
      },
    });
    return labelView;
  }
}

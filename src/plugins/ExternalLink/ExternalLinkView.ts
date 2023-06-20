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
} from "@ckeditor/ckeditor5-ui";
import { FocusTracker, Collection, Locale } from "@ckeditor/ckeditor5-utils";
import {
  GetCallback,
  BaseEvent,
} from "@ckeditor/ckeditor5-utils/src/emittermixin";

export class ExternalLinkView extends View {
  private focusTracker: FocusTracker;
  private items: ViewCollection;
  private viewer: LinkViewer;

  constructor(viewer: LinkViewer) {
    super(viewer.locale);
    this.viewer = viewer;
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.initItems();
  }

  private initItems() {
    this.items.add(this.createLabel("Link URL"));
  }

  private createLabel(text: any) {
    const labelView = new LabelView(this.locale);
    labelView.text = text;
    labelView.extendTemplate({
      attributes: {
        class: ["ck", "ck-color-grid__label"],
      },
    });
    return labelView;
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
}

export interface LinkViewer {
  locale?: Locale;
}

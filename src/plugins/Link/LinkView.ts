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

export class LinkView extends View {
  constructor() {
    super();
  }

  render() {
    super.render();
    submitHandler({
      view: this,
    });
  }

  destroy() {
    super.destroy();
    //   this.focusTracker.destroy();
  }
}

/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
  View,
  LabeledFieldView,
  createLabeledInputText,
  ButtonView,
  submitHandler,
} from "@ckeditor/ckeditor5-ui";
import { icons } from "@ckeditor/ckeditor5-core";

export default class FormView extends View {
  constructor() {
    super();

    let abbrInputView = this.createInput("Add abbreviation");
    let titleInputView = this.createInput("Add title");

    let saveButtonView = this.createButton(
      "Save",
      icons.check,
      "ck-button-save",
    );
    // Submit type of the button will trigger the submit event on entire form when clicked
    // (see submitHandler() in render() below).
    saveButtonView.type = "submit";

    let cancelButtonView = this.createButton(
      "Cancel",
      icons.cancel,
      "ck-button-cancel",
    );

    // Delegate ButtonView#execute to FormView#cancel
    cancelButtonView.delegate("execute").to(this, "cancel");

    let childViews = this.createCollection([
      abbrInputView,
      titleInputView,
      saveButtonView,
      cancelButtonView,
    ]);

    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-abbr-form"],
        tabindex: "-1",
      },
      children: childViews,
    });
  }

  render() {
    super.render();

    // Submit the form when the user clicked the save button or pressed enter in the input.
    submitHandler({
      view: this,
    });
  }

  focus() {
    // childViews.first.focus();
  }

  createInput(label: any) {
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText,
    );

    labeledInput.label = label;

    return labeledInput;
  }

  createButton(label: any, icon: any, className: any) {
    const button = new ButtonView();

    button.set({
      label,
      icon,
      tooltip: true,
      class: className,
    });

    return button;
  }
}

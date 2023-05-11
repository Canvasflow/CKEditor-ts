import {
  View,
  LabeledFieldView,
  createLabeledInputText,
  ButtonView,
  submitHandler,
  InputView,
} from "@ckeditor/ckeditor5-ui";
import { icons } from "@ckeditor/ckeditor5-core";

export class FormView extends View {
  childViews: any;

  constructor(locale: any) {
    super(locale);

    const defaultColors = [
      "#1abc9c",
      "#2ecc71",
      "#3498db",
      "#9b59b6",
      "#34495e",
      "#16a085",
      "#27ae60",
      "#2980b9",
      "#8e44ad",
      "#2c3e50",
      "#f1c40f",
      "#e67e22",
      "#e74c3c",
      "#bdc3c7",
      "#95a5a6",
      "#f39c12",
      "#000000",
    ];
    let buttons = [];
    let colorPickerInput = null;
    for (const color of defaultColors) {
      console.log(color);
      buttons.push(this.createButton(color));
    }
    colorPickerInput = this.createColorInput();
    console.log([...buttons, colorPickerInput]);

    this.childViews = this.createCollection([...buttons, colorPickerInput]);

    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-abbr-form"],
        tabindex: "-1",
      },
      children: this.childViews,
    });
  }

  render() {
    super.render();
    submitHandler({
      view: this,
    });
  }

  focus() {
    this.childViews.first.focus();
  }

  createButton(label: any) {
    const button = new ButtonView();
    button.set({
      label,
      tooltip: false,
      //class: "red",
      labelStyle: `background-color: ${label} !important;`,
      withText: true,
    });

    return button;
  }

  createColorInput() {
    const colorInput = new InputView(this.locale);
    console.log(colorInput);
    colorInput.inputMode = "color";
    return colorInput;
  }
}

// export class FormView extends View {
//   constructor(locale: any) {
//     super(locale);

//     this.abbrInputView = this.createInput("Add abbreviation");
//     this.titleInputView = this.createInput("Add title");

//     this.setTemplate({
//       tag: "form",
//       attributes: {
//         class: ["ck", "ck-abbr-form"],
//         tabindex: "-1",
//       },
//     });
//   }

//   createInput(label: any) {
//     const labeledInput = new LabeledFieldView(
//       this.locale,
//       createLabeledInputText,
//     );

//     labeledInput.label = label;

//     return labeledInput;
//   }
// }

// export class FormView extends View {
//   abbrInputView: any;
//   titleInputView: any;
//   saveButtonView: ButtonView;
//   cancelButtonView: ButtonView;
//   childViews: any;
//   constructor(locale: any) {
//     super(locale);

//     this.abbrInputView = this._createInput("Add abbreviation");
//     this.titleInputView = this._createInput("Add title");

//     this.saveButtonView = this._createButton(
//       "Save",
//       icons.check,
//       "ck-button-save",
//     );

//     this.saveButtonView.type = "submit";

//     this.cancelButtonView = this._createButton("", null, "ck-button-save");
//     this.cancelButtonView.delegate("execute").to(this, "cancel");

//     this.childViews = this.createCollection([
//       this.abbrInputView,
//       this.titleInputView,
//       this.saveButtonView,
//       this.cancelButtonView,
//     ]);

//     this.setTemplate({
//       tag: "form",
//       attributes: {
//         class: ["ck", "ck-abbr-form"],
//         tabindex: "-1",
//       },
//       children: this.childViews,
//     });
//   }

//   render() {
//     super.render();
//     submitHandler({
//       view: this,
//     });
//   }

//   focus() {
//     this.childViews.first.focus();
//   }

//   _createInput(label: any) {
//     const labeledInput = new LabeledFieldView(
//       this.locale,
//       createLabeledInputText,
//     );

//     labeledInput.label = label;

//     return labeledInput;
//   }

//   _createButton(label: any, icon: any, className: any) {
//     const button = new ButtonView();

//     button.set({
//       label,
//       icon,
//       tooltip: true,
//       class: className,
//     });

//     return button;
//   }
// }

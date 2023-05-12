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
      // "#34495e",
      // "#16a085",
      // "#27ae60",
      // "#2980b9",
      // "#8e44ad",
      // "#2c3e50",
      // "#f1c40f",
      // "#e67e22",
      // "#e74c3c",
      // "#bdc3c7",
      // "#95a5a6",
      // "#f39c12",
      // "#000000",
    ];
    let buttons = [];
    let colorPickerInput = null;
    for (const color of defaultColors) {
      console.log(color);
      buttons.push(this.createColorButton(color));
    }
    colorPickerInput = this.createColorInput();

    let pickerButton = this.createButton(
      "Save",
      `<svg style="color: white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.5566 8.62411L14.1753 10.8096L8.69444 19.8846C8.37003 20.4218 7.76997 20.7295 7.14444 20.6796V20.6796C6.36571 20.6174 5.73623 20.0197 5.63385 19.2452L5.50014 18.2336C5.41328 17.5765 5.55264 16.9094 5.8953 16.3421L10.5566 8.62411Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"></path> <rect x="9.84003" y="5.72208" width="8.45496" height="2.11374" rx="1.05687" transform="rotate(31.1299 9.84003 5.72208)" fill="#333333" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect> <path d="M13.2886 4.10089C13.8921 3.10161 15.1914 2.78078 16.1907 3.3843V3.3843C17.19 3.98781 17.5108 5.28713 16.9073 6.28641L14.7217 9.90512L11.103 7.7196L13.2886 4.10089Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"></path> </svg>`,
      "ck-button-save",
    );
    pickerButton.type = "submit";
    let selectedColorButton = this.createBlankColorInput("#fff");
    this.listenTo(selectedColorButton, "data:change", () => {
      console.log("changed");
    });
    this.childViews = this.createCollection([
      ...buttons,
      colorPickerInput,
      pickerButton,
      selectedColorButton,
    ]);

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

  createColorButton(label: any) {
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
    colorInput.id = "color-picker";
    console.log(colorInput);
    return colorInput;
  }

  createBlankColorInput(label: any) {
    const colorInput = new InputView(this.locale);
    colorInput.value = label;
    colorInput.id = "selected-color";
    colorInput.isReadOnly = true;
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

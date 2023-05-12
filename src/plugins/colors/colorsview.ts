import {
  View,
  ButtonView,
  submitHandler,
  InputView,
  ColorGridView,
  LabelView,
} from "@ckeditor/ckeditor5-ui";

export class FormView extends View {
  columns: number | undefined;

  constructor(locale: any) {
    super(locale);

    const defaultColors = [
      { label: "#1abc9c", color: "#1abc9c" },
      { label: "#2ecc71", color: "#2ecc71" },
      { label: "#3498db", color: "#3498db" },
      { label: "#16a085", color: "#16a085" },
      { label: "#1abc9c", color: "#1abc9c" },
      { label: "#27ae60", color: "#27ae60" },
      { label: "#8e44ad", color: "#8e44ad" },
      { label: "#2c3e50", color: "#2c3e50" },
      { label: "#f1c40f", color: "#f1c40f" },
      { label: "#e74c3c", color: "#e74c3c" },
    ];

    let items = this.createCollection();
    items.add(this.createLabel("Default Colors"));
    if (defaultColors.length > 0) {
      items.add(this.createColorsGrid(defaultColors));
    }

    let pickerButton = this.createButton(
      "Save",
      `<svg style="color: white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.5566 8.62411L14.1753 10.8096L8.69444 19.8846C8.37003 20.4218 7.76997 20.7295 7.14444 20.6796V20.6796C6.36571 20.6174 5.73623 20.0197 5.63385 19.2452L5.50014 18.2336C5.41328 17.5765 5.55264 16.9094 5.8953 16.3421L10.5566 8.62411Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"></path> <rect x="9.84003" y="5.72208" width="8.45496" height="2.11374" rx="1.05687" transform="rotate(31.1299 9.84003 5.72208)" fill="#333333" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect> <path d="M13.2886 4.10089C13.8921 3.10161 15.1914 2.78078 16.1907 3.3843V3.3843C17.19 3.98781 17.5108 5.28713 16.9073 6.28641L14.7217 9.90512L11.103 7.7196L13.2886 4.10089Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"></path> </svg>`,
      "ck-button-save",
    );
    pickerButton.type = "submit";
    items.add(this.createLabel("Custom colors"));
    items.add(this.createColorInput());
    items.add(pickerButton);
    items.add(this.createBlankColorInput("#fff"));

    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-colors"],
      },
      children: items,
    });
  }

  render() {
    super.render();
    submitHandler({
      view: this,
    });
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

  createColorsGrid(colors: any) {
    const colorGridView = new ColorGridView(this.locale, {
      colorDefinitions: colors.map((item: any) => {
        item.label = item.color;
        item.options = { hasBorder: true };
        return item;
      }),
      columns: 4,
    });
    colorGridView.delegate("execute").to(this);
    console.log(colorGridView);
    return colorGridView;
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

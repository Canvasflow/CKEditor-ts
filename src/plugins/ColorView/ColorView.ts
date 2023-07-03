import {
  View,
  submitHandler,
  LabelView,
  ViewCollection,
  ButtonView,
  InputView,
  ColorGridView,
  ColorTileView,
} from "@ckeditor/ckeditor5-ui";
import { Locale } from "@ckeditor/ckeditor5-utils";
import CanvasflowEditor, { Colors, Color } from "../../BaseEditor";
import picker from "../../assets/icons/colorPicker.svg?raw";
import remove from "../../assets/icons/removeColor.svg?raw";

export class ColorView extends View {
  private items: ViewCollection;
  private removeColorButton?: ButtonView;
  private selectColorButton?: ButtonView;
  private colorInput?: InputView;

  colors?: Colors;
  fontBackground?: Colors;
  defaultColorsGridView?: ColorsGridView;
  customColorsGridView?: ColorsGridView;
  selectedColor?: string;

  onClearColor: (editor: any) => void = () => {};

  constructor(
    locale: Locale,
    editor: CanvasflowEditor,
    colors: Colors,
    label: string,
    selectedColor: string,
  ) {
    super(locale);
    this.items = this.createCollection();
    this.colors = colors;
    this.selectedColor = selectedColor;
    this.removeColorButton = this.getRemoveColorView(editor, label);
    this.defaultColorsGridView = this.getDefaultColorView(this.selectedColor);
    this.customColorsGridView = this.getCustomColorView(this.selectedColor);
    this.selectColorButton = this.getSelectColorView();
    this.colorInput = this.getInputColorView();

    this.items.addMany([
      this.removeColorButton,
      this.defaultColorsGridView,
      this.customColorsGridView,
      this.selectColorButton,
      this.colorInput,
    ]);
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-colors"],
      },
      children: this.items,
    });
  }

  private getRemoveColorView(
    editor: CanvasflowEditor,
    label: string,
  ): ButtonView {
    let clearButton = this.createButton(label, remove, "");
    clearButton.type = "button";
    clearButton.class = "clear-color-button";
    clearButton.on("execute", () => {
      this.onClearColor(editor);
      this.clearAllColors();
    });
    return clearButton;
  }

  private getSelectColorView(): ButtonView {
    let pickerButton = this.createButton("Select color", picker, "");
    pickerButton.type = "submit";
    pickerButton.class = "submit-color-button";
    return pickerButton;
  }

  private getDefaultColorView(selectedColor: string): ColorsGridView {
    const view = new ColorsGridView(
      this.locale!,
      "Default Color",
      this.colors!.defaultColor,
      selectedColor,
    );
    view.delegate("execute").to(this);
    return view;
  }

  private getCustomColorView(selectedColor: string): ColorsGridView {
    const view = new ColorsGridView(
      this.locale!,
      "Custom Color",
      this.colors!.customColor,
      selectedColor,
    );
    view.delegate("execute").to(this);
    return view;
  }

  private getInputColorView(): InputView {
    const colorInputView = new InputView(this.locale);
    colorInputView.id = "color-picker";
    return colorInputView;
  }

  private createButton(label: any, icon: any, className: any) {
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

  clearSelectedColor(color: string) {
    let found = false;
    this.defaultColorsGridView?.gridView.items.map((value) => {
      if (value.class === "selected-color" && value.color !== color) {
        found = true;
        value.class = "";
        return;
      }
    });
    if (!found) {
      this.customColorsGridView?.gridView.items.map((value) => {
        if (value.class === "selected-color" && value.color !== color) {
          found = true;
          value.class = "";
          return;
        }
      });
    }
  }

  clearAllColors() {
    let found = false;
    this.defaultColorsGridView?.gridView.items.map((value) => {
      if (value.class === "selected-color") {
        found = true;
        value.class = "";
        return;
      }
    });
    if (!found) {
      this.customColorsGridView?.gridView.items.map((value) => {
        if (value.class === "selected-color") {
          found = true;
          value.class = "";
          return;
        }
      });
    }
  }

  render() {
    super.render();
    submitHandler({
      view: this,
    });
  }
}

class ColorsGridView extends View {
  private label: string;
  private colors: Array<Color>;
  private selectedColor: string;
  public gridView: ColorGridView;
  public onSelectColor: (color: Color) => void = (color: Color) => {
    console.log(color);
  };

  constructor(
    locale: Locale,
    label: string,
    colors: Array<Color>,
    selectedColor: string,
  ) {
    super(locale);
    this.label = label;
    this.colors = colors;
    this.selectedColor = selectedColor;
    this.gridView = this.getGridView(this.selectedColor);
    const items = this.createCollection();
    items.addMany([this.getLabel(), this.gridView]);
    this.setTemplate({
      tag: "div",
      attributes: {
        class: ["ck", "ck-colors-grid", "ck-colors"],
      },
      children: items,
    });
  }

  getLabel(): LabelView {
    const labelView = new LabelView(this.locale);
    labelView.text = this.label;
    labelView.extendTemplate({
      attributes: {
        class: ["ck", "ck-color-grid__label"],
      },
    });
    return labelView;
  }

  setColors(colors: Array<Color>) {
    const colorGridView = new ColorGridView(this.locale, {
      colorDefinitions: colors.map((item: any) => {
        item.label = item.label;
        item.options = { hasBorder: true };
        return item;
      }),
      columns: 4,
    });
    this.gridView = colorGridView;
    const items = this.createCollection();
    items.addMany([this.getLabel(), this.gridView]);
    this.setTemplate({
      tag: "div",
      attributes: {
        class: ["ck", "ck-colors-grid", "ck-colors"],
      },
      children: items,
    });
  }

  getGridView(selectedColor: string | null): ColorGridView {
    const colorsSet = new Set();
    const colors: Array<Color> = this.colors.reduce(
      (acc: Array<Color>, color: Color) => {
        if (colorsSet.has(color.color)) {
          return acc;
        }
        colorsSet.add(color.color);
        acc.push(color);
        return acc;
      },
      [],
    );
    const tiles = colors.map((value) => {
      const selected = value.color === selectedColor ? true : false;
      return this.createColorTile(value.color, value.label, selected);
    });
    const colorGridView = new ColorGridView(this.locale, {
      columns: 4,
    });
    colorGridView.items.addMany(tiles);
    return colorGridView;
  }

  createColorTile(color: string, label: string, selected: boolean) {
    const newColor = new ColorTileView(this.locale);
    newColor.label = label;
    newColor.color = color;
    newColor.class = selected ? "selected-color" : "";
    this.listenTo(newColor, "execute", (evt: any) => {
      const { source } = evt;
      const { color, label } = source;
      this.onSelectColor({
        color,
        label,
      });
    });
    return newColor;
  }

  addColor(color: string, label: string) {
    const newColor = new ColorTileView(this.locale);
    newColor.label = label;
    newColor.color = color;
    //newColor.class = "selected-color";
    this.listenTo(newColor, "execute", (evt: any) => {
      const { source } = evt;
      const { color, label } = source;
      this.onSelectColor({
        color,
        label,
      });
    });
    this.gridView.items.add(newColor);
  }
}

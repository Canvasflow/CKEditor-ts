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
import { FocusTracker, Locale } from "@ckeditor/ckeditor5-utils";
import CanvasflowEditor, { Colors, Color } from "../../BaseEditor";
import picker from "../../assets/icons/colorPicker.svg?raw";
import remove from "../../assets/icons/removeColor.svg?raw";
import { CLEAR_FONT_COLOR_COMMAND } from "./TextFontColorCommands";

export class TextFontColorView extends View {
  private items: ViewCollection;
  private focusTracker: FocusTracker;
  colors?: Colors;
  private customColors?: ColorGridView;
  private editor: CanvasflowEditor;

  private removeColorButton?: ButtonView;
  private selectColorButton?: ButtonView;
  defaultColorsGridView?: ColorsGridView;
  customColorsGridView?: ColorsGridView;
  private colorInput?: InputView;

  constructor(locale: Locale, editor: CanvasflowEditor) {
    super(locale);
    this.editor = editor;
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();

    // Add view to the component
    // this.items.add(this.removeColorView)
    if (!editor.colors) {
      return;
    }
    this.colors = editor.colors;

    this.removeColorButton = this.getRemoveColorView();
    this.defaultColorsGridView = this.getDefaultColorView();
    this.customColorsGridView = this.getCustomColorView();
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

    // this.setItems(this.colors);
  }

  private getRemoveColorView(): ButtonView {
    let clearButton = this.createButton("Remove color", remove, "");
    clearButton.type = "button";
    clearButton.class = "clear-color-button";
    clearButton.on("execute", () => {
      this.editor.execute(CLEAR_FONT_COLOR_COMMAND);
    });
    return clearButton;
  }

  private getSelectColorView(): ButtonView {
    let pickerButton = this.createButton("Select color", picker, "");
    pickerButton.type = "submit";
    pickerButton.class = "submit-color-button";
    return pickerButton;
  }

  private getDefaultColorView(): ColorsGridView {
    const view = new ColorsGridView(
      this.editor.locale,
      "Default Color",
      this.colors!.defaultColor,
    );
    view.delegate("execute").to(this);
    return view;
  }

  private getCustomColorView(): ColorsGridView {
    const view = new ColorsGridView(
      this.editor.locale,
      "Custom Color",
      this.colors!.customColor,
    );
    view.delegate("execute").to(this);
    return view;
  }

  private getInputColorView(): InputView {
    const colorInputView = new InputView(this.locale);
    colorInputView.id = "color-picker";
    return colorInputView;
  }

  private setItems(colors: Colors) {
    this.items.add(this.createClearColorLabel());
    this.items.add(this.createLabel("Default Colors"));
    this.setDefaultColors(colors);
    this.setCustomColors(colors);
    this.addPickerButton();
    this.items.add(this.createColorInput());
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-colors"],
      },
      children: this.items,
    });
  }

  private createClearColorLabel() {
    let clearButton = this.createButton("Remove color", remove, "");
    clearButton.type = "button";
    clearButton.class = "clear-color-button";
    clearButton.on("execute", () => {
      this.editor.execute(CLEAR_FONT_COLOR_COMMAND);
    });
    return clearButton;
  }

  private setDefaultColors(colors: Colors) {
    const defaultColorList = colors.defaultColor;
    if (defaultColorList.length > 0) {
      this.items.add(this.createColorsGrid(defaultColorList));
    }
  }

  private setCustomColors(colors: Colors) {
    this.items.add(this.createLabel("Custom colors"));
    const colorList = colors.customColor;
    this.customColors = this.createColorsGrid(colorList);
    this.items.add(this.customColors);
  }

  private addPickerButton() {
    let pickerButton = this.createButton("Select color", picker, "");
    pickerButton.type = "submit";
    pickerButton.class = "submit-color-button";
    this.items.add(pickerButton);
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

  private createColorInput() {
    const colorInput = new InputView(this.locale);
    colorInput.id = "color-picker";
    return colorInput;
  }

  private createColorsGrid(colors: any) {
    const colorGridView = new ColorGridView(this.locale, {
      colorDefinitions: colors.map((item: any) => {
        item.label = item.color;
        item.options = { hasBorder: true };
        return item;
      }),
      columns: 4,
    });

    colorGridView.delegate("execute").to(this);
    return colorGridView;
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

  /**
   * Insert new color into list
   *
   */
  addCustomColor(color: string, label: string) {
    const newColor = new ColorTileView(this.locale);
    newColor.label = label;
    newColor.color = color;
    newColor.delegate("execute").to(this);
    //this.customColors?.items.add(newColor);
    this.customColorsGridView!.gridView.items.add(newColor);
  }

  /**
   * Insert elements into DOM
   *
   */
  showView() {
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-page", "ck-colors"],
      },
      children: this.items,
    });
  }
}

class ColorsGridView extends View {
  private label: string;
  private colors: Array<Color>;
  public gridView: ColorGridView;
  public onSelectColor: (color: Color) => void = (color: Color) => {
    console.log(color);
  };
  constructor(locale: Locale, label: string, colors: Array<Color>) {
    super(locale);
    this.label = label;
    this.colors = colors;
    this.gridView = this.getGridView();
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

  getGridView(): ColorGridView {
    const colorGridView = new ColorGridView(this.locale, {
      colorDefinitions: this.colors.map((item: any) => {
        item.label = item.color;
        item.options = { hasBorder: true };
        return item;
      }),
      columns: 4,
    });

    return colorGridView;
  }

  addColor(color: string, label: string) {
    const newColor = new ColorTileView(this.locale);
    newColor.label = label;
    newColor.color = color;
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

import {
  View,
  ButtonView,
  submitHandler,
  InputView,
  ColorGridView,
  LabelView,
  ViewCollection,
  ColorTileView,
} from "@ckeditor/ckeditor5-ui";

import { FocusTracker } from "@ckeditor/ckeditor5-utils";
import CanvasflowEditor, { Colors } from "../../BaseEditor";
import icon from "./ColorPickIcon.svg?raw";
import remove from "./FontBackgroundRemove.svg?raw";
import { CLEAR_BACKGROUND_COLOR_COMMAND } from "./FontBackgroundCommands";

export class FontBackgroundView extends View {
  columns: number | undefined;
  items: ViewCollection;
  focusTracker: FocusTracker;
  colors: Colors;
  editor: CanvasflowEditor;
  private customColors?: ColorGridView;

  constructor(locale: any, editor: CanvasflowEditor) {
    super(locale);
    this.editor = editor;
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.colors = editor.config.get("fontBackground") as Colors;
    this.setItems(this.colors);
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
    let pickerButton = this.createButton("Select color", icon, "");
    pickerButton.type = "submit";
    pickerButton.class = "submit-color-button";
    this.items.add(pickerButton);
  }

  private createClearColorLabel() {
    let clearButton = this.createButton("Remove Background", remove, "");
    clearButton.type = "button";
    clearButton.class = "clear-color-button";
    clearButton.on("execute", () => {
      //this.editor.execute("fontFamily"); // THIS IS IMPORTANT
      this.editor.execute(CLEAR_BACKGROUND_COLOR_COMMAND);
    });
    return clearButton;
  }

  private createButton(label: string, icon: string, className: string) {
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

  private createColorsGrid(colors: Array<any>) {
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

  private createLabel(text: string) {
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
    this.customColors?.items.add(newColor);
  }
}

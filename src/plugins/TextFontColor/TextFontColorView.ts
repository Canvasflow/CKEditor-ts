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
import CanvasflowEditor, { Colors } from "../../BaseEditor";
import icon from "./PickColorIcon.svg?raw";
import remove from "./TextFontColorRemoveIcon.svg?raw";
import { CLEAR_FONT_COLOR_COMMAND } from "./TextFontColorCommands";

export class TextFontColorView extends View {
  private items: ViewCollection;
  private focusTracker: FocusTracker;
  private colors: Colors;
  private customColors?: ColorGridView;
  private editor: CanvasflowEditor;

  constructor(locale: Locale, editor: CanvasflowEditor) {
    super(locale);
    this.editor = editor;
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.colors = editor.config.get("colors") as Colors;
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

  private createClearColorLabel() {
    let clearButton = this.createButton("Remove color", remove, "");
    clearButton.type = "button";
    clearButton.class = "clear-color-button";
    clearButton.on("execute", () => {
      console.log("execute clear was called");
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
    let pickerButton = this.createButton("Select color", icon, "");
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
    newColor.delegate("execute").to(this); //issue
    this.customColors?.items.add(newColor);
  }

  /**
   * Insert elements into DOM
   *
   */
  showView() {
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-page", "page-link"],
      },
      children: this.items,
    });
  }
}

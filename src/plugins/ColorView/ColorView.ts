import {
  View,
  submitHandler,
  LabelView,
  ButtonView,
  InputView,
  ColorTileView,
} from "@ckeditor/ckeditor5-ui";
import { CustomColorGridView } from './CustomColorGridView';
import { InputColorView } from './InputColorView';
import { BaseEvent, GetCallback } from "@ckeditor/ckeditor5-utils";
import CanvasflowEditor, { Colors, Color } from "../../BaseEditor";
import picker from "../../assets/icons/colorPicker.svg?raw";
import remove from "../../assets/icons/removeColor.svg?raw";

export class ColorView extends View {
  private viewer: ColorViewer;
  private removeColorButton?: ButtonView;
  private selectColorButton?: ButtonView;
  private colorInput?: InputView;

  colors: Colors;
  defaultColorsGridView: ColorsGridView;
  customColorsGridView: ColorsGridView;
  selectedColor?: string;

  constructor(viewer: ColorViewer) {
    const { editor, colors } = viewer;
    const { locale, model } = editor;
    const { document } = model;
    super(locale);
    this.viewer = viewer;
    const items = this.createCollection();

    this.colors = colors;
    this.removeColorButton = this.getRemoveColorView();
    this.defaultColorsGridView = this.getDefaultColorView();
    this.customColorsGridView = this.getCustomColorView();
    this.selectColorButton = this.getSelectColorView();
    // this.colorInput = this.getInputColorView();


    items.addMany([
      this.removeColorButton,
      this.defaultColorsGridView,
      this.customColorsGridView,
      this.selectColorButton,
      // this.colorInput,
      new InputColorView({
        locale, onChange: (color: string) => {
          this.customColorsGridView.gridView.add({ color: color, label: color });
        }
      })
    ]);
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-colors"],
      },
      children: items,
    });

    document.selection.on("change:range", this.onSelectionChange);
  }

  private onSelectionChange = () => {
    const { editor, attribute } = this.viewer;
    const { selection } = editor.model.document;
    if (!selection) {
      return;
    }
    const range = selection.getFirstRange();
    if (!range) {
      return;
    }

    const colors: Array<string> = [];
    for (const item of range.getItems()) {
      if (item.hasAttribute(attribute)) {
        const color = item.getAttribute(attribute) as string;
        colors.push(color);
        continue;
      }
      colors.push("");
    }

    const filteredEmpty = colors.filter((i) => !!i);

    /*
        - If all selection are empty set the label as empty
        - If one range has a font and at least one of 
            the other doesnt returns empty
    */

    if (!filteredEmpty.length || filteredEmpty.length !== colors.length) {
      this.setGridsSelectedColor("");
      return;
    }

    const colorsSet = new Set([...filteredEmpty]);

    // If there is more then one return empty
    if (colorsSet.size > 1) {
      this.setGridsSelectedColor("");

      return;
    }

    const color = [...colorsSet][0];

    this.setGridsSelectedColor(color);
  };

  setGridsSelectedColor(color: string) {
    this.selectedColor = color;

    this.defaultColorsGridView?.selectColor(color);
    this.customColorsGridView?.selectColor(color);
  }

  private getRemoveColorView(): ButtonView {
    const label =
      this.viewer.attribute === "fontColor"
        ? "Remove color"
        : "Remove background";
    let clearButton = this.createButton(label, remove, "");
    clearButton.type = "button";
    clearButton.class = "clear-color-button";
    clearButton.on("execute", () => {

      this.viewer.onClearColor();
      this.setGridsSelectedColor("");
    });

    return clearButton;
  }

  private getSelectColorView(): ButtonView {
    let pickerButton = this.createButton("Select color", picker, "");
    pickerButton.type = "button";
    pickerButton.class = "submit-color-button";
    pickerButton.on("execute", () => {
      this.addColor({ color: '#00f', label: '#00f' })
      this.viewer.onPickColor();
      console.log(pickerButton)
    });
    return pickerButton;
  }

  addColor = (color: Color) => {
    this.customColorsGridView.gridView.add(color)
  }

  private getDefaultColorView(): ColorsGridView {
    return new ColorsGridView(
      this.viewer,
      "Default Color",
      this.colors!.defaultColor
    );
  }

  private getCustomColorView(): ColorsGridView {
    return new ColorsGridView(
      this.viewer,
      "Custom Color",
      this.colors!.customColor,
    );
  }

  private getInputColorView(): InputView {
    const colorInputView = new InputView(this.locale);
    colorInputView.inputMode = 'color';
    colorInputView.id =
      this.viewer.attribute === "fontColor"
        ? "font-color-picker"
        : "background-color-picker";
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

  render() {
    super.render();
    submitHandler({
      view: this,
    });
  }
}

export interface ColorViewer {
  editor: CanvasflowEditor;
  colors: Colors;
  attribute: ColorViewerType;
  onClearColor: () => void;
  onSetColor: (color: string) => void;
  selectedColor: string;
  onPickColor: () => void;
}

export type ColorViewerType = "fontColor" | "backgroundColor";

class ColorsGridView extends View {
  private viewer: ColorViewer;
  private label: string;
  public gridView: CustomColorGridView;
  colors: Array<Color>;
  selectedColor?: string;

  constructor(
    viewer: ColorViewer,
    label: string,
    input: Array<Color>
  ) {
    const { locale } = viewer.editor;
    super(locale);
    this.viewer = viewer;
    this.label = label;
    this.colors = input;
    this.gridView = new CustomColorGridView({
      locale,
      colors: input,
      onClickColor: this.onClickColor
    });
    this.setTemplate({
      tag: "div",
      attributes: {
        class: ["ck", "ck-colors-grid", "ck-colors"],
      },
      children: [this.getLabel(), this.gridView],
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

  onClickColor: GetCallback<BaseEvent> = (evt) => {
    const { onSetColor } = this.viewer;
    const view: ColorTileView = evt.source as any;
    const { color } = view;
    onSetColor(color!);
    this.gridView.selectColor(color!);
  };

  selectColor(color: string) {
    this.gridView.selectColor(color);
  }
}

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
import { BaseEvent, GetCallback, } from "@ckeditor/ckeditor5-utils";
import CanvasflowEditor, { Colors, Color } from "../../BaseEditor";
import picker from "../../assets/icons/colorPicker.svg?raw";
import remove from "../../assets/icons/removeColor.svg?raw";

export class ColorView extends View {
  private viewer: ColorViewer;
  private items: ViewCollection;
  private removeColorButton?: ButtonView;
  private selectColorButton?: ButtonView;
  private colorInput?: InputView;

  colors?: Colors;
  fontBackground?: Colors;
  defaultColorsGridView?: ColorsGridView;
  customColorsGridView?: ColorsGridView;

  constructor(viewer: ColorViewer) {
    const { editor, colors } = viewer;
    const { locale, model } = editor;
    const { document } = model;
    super(locale);
    this.viewer = viewer;
    this.items = this.createCollection();
    this.colors = colors;

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
    document.selection.on('change:range', this.onSelectionChange);
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
      colors.push('');
    }

    const filteredEmpty = colors.filter(i => !!i);

    /*
        - If all selection are empty set the label as empty
        - If one range has a font and at least one of 
            the other doesnt returns empty
    */

    if (!filteredEmpty.length || (filteredEmpty.length !== colors.length)) {
      this.setGridsSelectedColor('')
      return;
    }

    const colorsSet = new Set([...filteredEmpty]);

    // If there is more then one return empty
    if (colorsSet.size > 1) {
      this.setGridsSelectedColor('')

      return;
    }

    const color = [...colorsSet][0];

    this.setGridsSelectedColor(color);
  }

  setGridsSelectedColor(color: string) {
    this.defaultColorsGridView?.selectColor(color);
    this.customColorsGridView?.selectColor(color);
  }

  private getRemoveColorView(): ButtonView {
    const label = this.viewer.attribute === 'fontColor' ? 'Remove color' : 'Remove background'
    let clearButton = this.createButton(label, remove, "");
    clearButton.type = "button";
    clearButton.class = "clear-color-button";
    clearButton.on("execute", () => {
      this.viewer.onClearColor();
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
    return new ColorsGridView(
      this.viewer,
      "Default Color",
      this.colors!.defaultColor,
    );;
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

  render() {
    super.render();
    submitHandler({
      view: this,
    });
  }
}

export interface ColorViewer {
  editor: CanvasflowEditor,
  colors: Colors,
  attribute: ColorViewerType;
  onClearColor: () => void;
  onSetColor: (color: string) => void;
  selectedColor: string;
}

export type ColorViewerType = 'fontColor' | 'backgroundColor'


class ColorsGridView extends View {
  private viewer: ColorViewer;
  private label: string;
  private colors: Array<Color>;
  public gridView: ColorGridView;
  constructor(viewer: ColorViewer, label: string, colors: Array<Color>) {
    const { locale } = viewer.editor;
    super(locale);
    this.viewer = viewer;
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
    const { selectedColor } = this.viewer;
    const colors = this.getUniqueColors();
    const colorGridView = new ColorGridView(this.locale, {
      colorDefinitions: colors.map((item: any) => {
        item.label = item.label.length > 0 ? item.label : item.color;
        item.options = { hasBorder: true };
        return item;
      }),
      columns: 4,
    });

    for (const item of colorGridView.items) {
      item.class = selectedColor === item.color ? 'selected-color' : '';
      item.on('execute', this.onClickColor)
    }

    return colorGridView;
  }

  getUniqueColors(): Array<Color> {
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
    return colors
  }

  mapColorTileView(color: string, label: string, className?: string): ColorTileView {
    const colorTileView = new ColorTileView(this.locale);
    colorTileView.label = label;
    colorTileView.color = color;
    if (className) {
      colorTileView.class = className;
    }
    colorTileView.on('execute', this.onClickColor)
    return colorTileView;
  }

  onClickColor: GetCallback<BaseEvent> = (evt) => {
    const { onSetColor } = this.viewer;
    const view: ColorTileView = evt.source as any;
    const { color } = view;
    console.log(`In the button`, color)
    onSetColor(color!)
  }

  selectColor = (color: string) => {
    this.viewer.selectedColor = color;
    console.log(`The color should be: `, color)
    // this.gridView.destroy();
    // this.gridView = this.getGridView();
  }
}




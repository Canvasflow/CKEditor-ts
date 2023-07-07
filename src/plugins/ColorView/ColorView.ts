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
import { BaseEvent, GetCallback, Collection } from "@ckeditor/ckeditor5-utils";
import CanvasflowEditor, { Colors, Color } from "../../BaseEditor";
import picker from "../../assets/icons/colorPicker.svg?raw";
import remove from "../../assets/icons/removeColor.svg?raw";

export class ColorView extends View {
  private viewer: ColorViewer;
  private items: ViewCollection;
  private removeColorButton?: ButtonView;
  private selectColorButton?: ButtonView;
  private colorInput?: InputView;

  colors: Colors;
  defaultColorsGridView: ColorsGridView;
  customColorsGridView: ColorsGridView;

  constructor(viewer: ColorViewer) {
    const { editor, colors } = viewer;
    const { locale, model } = editor;
    const { document } = model;
    super(locale);
    this.viewer = viewer;
    this.items = this.createCollection();
    console.log("THIS VIEW IS CREATED BY: ", this.viewer.attribute);

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

    setTimeout(() => {
      this.customColorsGridView.add({ color: '#fa0000', label: 'birght red' });
      console.log(`I ADDED THE RED`, this.customColorsGridView.colors.length);
    }, 10000)
    this.addColor = this.addColor.bind(this);
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
    this.defaultColorsGridView?.selectColor(color);
    this.customColorsGridView?.selectColor(color);
  }

  addColor = (color: string, label: string) => {
    console.log("adding color: ", color)
    this.customColorsGridView.add({ color, label });
    console.log(`LENGTH: `, this.customColorsGridView.colors.length);
    /*console.log("adding color: ", color);
    this.customColorsGridView.add({ color, label });*/
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
    });
    return clearButton;
  }

  private getSelectColorView(): ButtonView {
    let pickerButton = this.createButton("Select color", picker, "");
    pickerButton.type = "button";
    pickerButton.class = "submit-color-button";
    pickerButton.on("execute", () => {
      this.viewer.onPickColor();
    });
    return pickerButton;
  }

  private getDefaultColorView(): ColorsGridView {
    return new ColorsGridView(
      this.viewer,
      "Default Color",
      this.colors!.defaultColor,
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
  public gridView: ColorGridView;

  colors: Collection<Color>;

  constructor(viewer: ColorViewer, label: string, colors: Array<Color>) {
    const { locale } = viewer.editor;
    super(locale);
    this.viewer = viewer;
    this.label = label;
    this.colors = new Collection(this.getUniqueColors(colors))
    this.gridView = this.getGridView();
    this.setTemplate({
      tag: "div",
      attributes: {
        class: ["ck", "ck-colors-grid", "ck-colors"],
      },
      children: [this.getLabel(), this.gridView],
    });

    this.gridView.items.bindTo(this.colors).using(this.mapColor());

    // FIXME THIS WORKS AND I DONT KNOW WHY
    /*setTimeout(() => {
      this.add({ color: '#3d3d3d', label: 'grey' });
    }, 5000);*/
  }

  add = (color: Color) => {
    this.colors.add({ ...color });
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
      colorDefinitions: [],
      columns: 4,
    });

    return colorGridView;
  }

  getUniqueColors(colorList: Array<Color>): Array<Color> {
    const colorsSet = new Set();
    const colors: Array<Color> = colorList.reduce(
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
    return colors;
  }

  mapColor() {
    const { onClickColor, locale, viewer } = this;
    const { selectedColor } = viewer;
    return (color: Color): ColorTileView => {
      const colorTileView = new ColorTileView(locale);
      colorTileView.label = color.label;
      colorTileView.color = color.color;
      colorTileView.class = selectedColor === color.color ? "selected-color" : "";
      colorTileView.on("execute", onClickColor);
      return colorTileView;
    }
  }

  onClickColor: GetCallback<BaseEvent> = (evt) => {
    const { onSetColor } = this.viewer;
    const view: ColorTileView = evt.source as any;
    const { color } = view;
    onSetColor(color!);
  };

  selectColor = (color: string) => {
    this.viewer.selectedColor = color;
    this.clearColor();
  };

  clearColor = () => {
    this.gridView.items.map((value) => {
      value.class = "";
      return value;
    });
  };
}

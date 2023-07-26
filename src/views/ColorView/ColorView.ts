import CanvasflowEditor, { Colors, Color } from "../../BaseEditor";
import { CustomColorGridView } from "./CustomColorGridView";
import { InputColorView } from "./InputColorView";
import { BaseEvent, GetCallback } from "@ckeditor/ckeditor5-utils";
import {
  View,
  submitHandler,
  LabelView,
  ButtonView,
  ColorTileView,
} from "@ckeditor/ckeditor5-ui";
import { getIcon } from "../../icons/icons";

export class ColorView extends View {
  private viewer: ColorViewer;
  private removeColorButton?: ButtonView;
  private selectColorView?: InputColorView;

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
    this.selectColorView = new InputColorView({
      locale,
      onChange: this.onAddColor,
    });

    items.addMany([
      this.removeColorButton,
      this.defaultColorsGridView,
      this.customColorsGridView,
      this.selectColorView,
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

  resetCustomColorCollection() {
    this.customColorsGridView.gridView.clear;
    const customColors = this.customColorsGridView.gridView.getUniqueColors(
      this.colors.customColor,
    );
    for (const c of customColors) {
      c.selected = this.customColorsGridView?.selectedColor === c.color;
      this.customColorsGridView.gridView.add(c);
    }
  }

  private onAddColor = (color: string) => {
    this.viewer.onAddColor(color);
    this.customColorsGridView.gridView.add({ color: color, label: color });
  };

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
    this.defaultColorsGridView.selectColor(color);
    this.customColorsGridView.selectColor(color);
  }

  private getRemoveColorView(): ButtonView {
    const label =
      this.viewer.attribute === "fontColor"
        ? "Remove color"
        : "Remove background";
    let clearButton = this.createButton(label, getIcon("removeColor"));
    clearButton.type = "button";
    clearButton.class = "clear-color-button";
    clearButton.on("execute", () => {
      this.clearAllColors();
    });

    return clearButton;
  }

  addColor = (color: Color) => {
    this.customColorsGridView.gridView.add(color);
  };

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

  private createButton(label: any, className: any) {
    const button = new ButtonView();
    button.set({
      label,
      icon: getIcon("removeColor"),
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
    this.viewer.onClearColor();
    this.defaultColorsGridView.selectColor("");
    this.customColorsGridView.selectColor("");
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
  onAddColor: (color: string) => void;
}

export type ColorViewerType = "fontColor" | "highlightColor";

class ColorsGridView extends View {
  private viewer: ColorViewer;
  private label: string;
  public gridView: CustomColorGridView;
  colors: Array<Color>;
  selectedColor?: string;

  constructor(viewer: ColorViewer, label: string, input: Array<Color>) {
    const { locale } = viewer.editor;
    super(locale);
    this.viewer = viewer;
    this.label = label;
    this.colors = input;
    this.gridView = new CustomColorGridView({
      locale,
      colors: input,
      onClickColor: this.onClickColor,
    });

    //this.gridView.clear()
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

  selectColor = (color: string) => {
    this.gridView.selectColor(color);
  };
}

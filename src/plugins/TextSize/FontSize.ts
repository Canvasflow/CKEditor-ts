import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { TextSizeComponent, TextSizeViewer } from "./TextSizeComponent";
import CanvasflowEditor from "../../BaseEditor";
import { Locale } from "@ckeditor/ckeditor5-utils";
import { TextSizeEditing } from "./TextSizeEditing";

export class FontSize extends Plugin implements TextSizeViewer {

  declare editor: CanvasflowEditor;
  fontSizeView: TextSizeComponent;
  locale: Locale;
  min: number = 8;
  max: number = 50;
  step: number = 1;
  currentValue: string = "";

  constructor(editor: CanvasflowEditor) {
    super(editor);
    this.locale = this.editor.locale;
    this.fontSizeView = new TextSizeComponent(this);
  }

  init() {
    const { model } = this.editor;
    const { document } = model;

    this.fontSizeView.showView();
    this.editor.ui.componentFactory.add(TextSizeComponent.viewName, () => {
      return this.fontSizeView;
    });

    this.fontSizeView.on("change:value", (evt) => {
      if (!evt.source) {
        return;
      }
      const source: any = evt.source;
      const value = `${source.value}px`;
      console.log(`The value is: "${value}"`);
      this.editor.execute(`fontSize`, { value });
    });

    document.selection.on("change:range", this.onSelectionChange);
  }

  private onSelectionChange = () => {
    const element: any = this.fontSizeView.input.element;
    const { selection } = this.editor.model.document;
    if (!selection) {
      return;
    }
    const range = selection.getFirstRange();
    if (!range) {
      return;
    }

    const sizes = [];
    for (const item of range.getItems()) {
      if (item.hasAttribute("fontSize")) {
        sizes.push(item.getAttribute("fontSize"));
        continue;
      }
      sizes.push("");
    }
    const filteredEmpty = sizes.filter((i) => !!i);
    if (!filteredEmpty.length || filteredEmpty.length !== sizes.length) {
      element.value = "";
      this.currentValue = "";
      return;
    }
    const sizeSet = new Set([...filteredEmpty]);
    if (sizeSet.size > 1) {
      element.value = "";
      this.currentValue = "";
      return;
    }
    const selected = [...sizeSet][0];
    if (selected) {
      let value = selected.toString();
      this.currentValue = value.substring(0, value.length - 2);
      element.value = this.currentValue;
    }
  };

  onChange = (size: string) => {
    const parsedSize = parseInt(size);
    if (parsedSize < this.min) {
      this.setValue(this.min.toString());
      return;
    }
    if (parsedSize > this.max) {
      this.setValue(this.max.toString());
      return;
    }

    this.currentValue = size;
    const value = `${size}px`;
    this.editor.execute(`fontSize`, { value });
  };

  onIncreaseSize() {
    if (!this.currentValue) {
      this.setValue(this.min.toString());
      return;
    }

    let current = parseInt(this.currentValue);
    if (current >= this.max) {
      return;
    }
    current++;
    this.setValue(current.toString());
  }
  onDecreaseSize() {
    if (!this.currentValue) {
      this.setValue(this.min.toString());
      return;
    }

    let current = parseInt(this.currentValue);
    if (current <= this.min) {
      return;
    }
    current--;
    this.setValue(current.toString());
  }

  private setValue(value: string) {
    this.currentValue = value;
    this.fontSizeView.input.set("value", this.currentValue);
    this.fontSizeView.updateInputElement(this.currentValue);
  }

  static get requires() {
    return [TextSizeEditing];
  }
}

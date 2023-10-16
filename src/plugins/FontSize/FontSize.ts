import CanvasflowEditor from "../../BaseEditor";
import { Locale, GetCallback, EventInfo } from "@ckeditor/ckeditor5-utils";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { FontSizeComponent, FontSizeViewer } from "./FontSizeComponent";
import { FontSizeEditing } from "./FontSizeEditing";
import { TEXT_SIZE_ATTR, TEXT_SIZE_COMMAND } from "./FontSizeCommands";
import { DomConverter } from "@ckeditor/ckeditor5-engine";

export class FontSize extends Plugin implements FontSizeViewer {
  declare editor: CanvasflowEditor;
  fontSizeView: FontSizeComponent;
  locale: Locale;
  min: number = 8;
  max: number = 150;
  step: number = 1;
  currentValue: string = "";

  constructor(editor: CanvasflowEditor) {
    super(editor);
    this.locale = this.editor.locale;
    this.fontSizeView = new FontSizeComponent(this);
  }

  init() {
    const { model } = this.editor;
    const { document } = model;

    this.fontSizeView.showView();
    this.editor.ui.componentFactory.add(FontSizeComponent.viewName, () => {
      return this.fontSizeView;
    });

    this.fontSizeView.on("change:value", (evt) => {
      if (!evt.source) {
        return;
      }
      const source: any = evt.source;
      const value = `${source.value}px`;
      this.editor.execute(TEXT_SIZE_COMMAND, { value });
    });

    document.selection.on("change:range", this.onSelectionChange);
  }

  private onSelectionChange = (evt: EventInfo): void => {
    const source: any = evt.source;
    const element: any = this.fontSizeView.input.element;
    const { selection } = this.editor.model.document;
    const editingView = this.editor.editing.view;
    if (!selection) {
      return;
    }

    const range = selection.getFirstRange();
    if (!range) {
      return;
    }

    let count = 0;
    for (const _ of range.getItems()) {
      count += 1;
    }

    if (!count) {
      return;
    }

    // TODO Implement default font size logic
    let defaultFontSize = this.getDefaultFontSize();
    console.log(`DEFAULT FONT SIZE: ${defaultFontSize}`);

    const sizes = [];
    for (const item of range.getItems()) {
      if (item.hasAttribute(TEXT_SIZE_ATTR)) {
        sizes.push(item.getAttribute(TEXT_SIZE_ATTR));
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

  private getDefaultFontSize(): null | number {
    const editingView = this.editor.editing.view;
    let defaultFontSize: null | number = null;
    const editorEl = editingView.getDomRoot();
    if (editorEl && window.getComputedStyle(editorEl, null)) {
      let value = window.getComputedStyle(editorEl, null)
        .getPropertyValue('font-size')
      if (value) {
        value = value.replace('px', '');
        defaultFontSize = parseFloat(value);
      }
    }
    return defaultFontSize;
  }

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
    this.editor.execute(TEXT_SIZE_COMMAND, value);
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
    return [FontSizeEditing];
  }
}

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { TextSizeComponent, TextSizeViewer } from "./TextSizeComponent";
import CanvasflowEditor from "../../BaseEditor";
import { Locale } from "@ckeditor/ckeditor5-utils";
export class TextSizeUI extends Plugin implements TextSizeViewer {
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
      return this.fontSizeView!;
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
    console.log(sizes);
    const filteredEmpty = sizes.filter((i) => !!i);
    if (!filteredEmpty.length || filteredEmpty.length !== sizes.length) {
      this.fontSizeView.input.element.value = "";
      this.currentValue = "";
      return;
    }
    const sizeSet = new Set([...filteredEmpty]);
    if (sizeSet.size > 1) {
      this.fontSizeView.input.element.value = "";
      this.currentValue = "";
      return;
    }

    const selected = [...sizeSet][0];
    if (selected) {
      this.currentValue = selected.substring(0, selected.length - 2);
      this.fontSizeView.input.element.value = this.currentValue;
    }
    // this.currentValue = selected.substring(0, 2);
    // this.selectedFontSize = selected.substring(0, 2);
  };

  onChange = (size: string) => {
    console.log("On Change: ", size);
    this.currentValue = size;
    const value = `${size}px`;
    this.editor.execute(`fontSize`, { value });
  };

  onIncreaseSize() {
    let current = parseInt(this.currentValue);
    current++;
    this.currentValue = current.toString();
    this.fontSizeView.input.set("value", this.currentValue);
    //  this.fontSizeView.input.element.value = current;
  }
  onDecreaseSize() {
    let current = parseInt(this.currentValue);
    current--;
    this.currentValue = current.toString();
    this.fontSizeView.input.set("value", this.currentValue);
    //  this.fontSizeView.input.element.value = current;
  }
}

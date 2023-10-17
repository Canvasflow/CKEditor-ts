import CanvasflowEditor from "../../BaseEditor";
import { View, ViewCollection } from "@ckeditor/ckeditor5-ui";
import { FontSizeView } from "./FontSizeView";
import { Locale } from "@ckeditor/ckeditor5-utils";

export class FontSizeComponent extends View {
  static viewName = "fontSizeInputCF";
  private items: ViewCollection;
  input: FontSizeView;

  constructor(viewer: FontSizeViewer) {
    super(viewer.locale);
    this.items = this.createCollection();
    this.input = new FontSizeView(viewer);
    this.init();
  }

  private init() {
    this.items.add(this.input);
  }

  /**
   * Insert elements into DOM
   *
   */
  showView() {
    this.setTemplate({
      tag: "div",
      attributes: {
        class: ["ck", "ck-page", "font-size"],
      },
      children: this.items,
    });
  }

  updateInputElement(value: string) {
    const element: any = this.input.element;
    element.value = value;
  }
}

export interface FontSizeViewer {
  editor: CanvasflowEditor;
  locale?: Locale;
  min: number;
  max: number;
  step: number;
  onChange: (value: string) => void;
  onIncreaseSize: () => void;
  onDecreaseSize: () => void;
}

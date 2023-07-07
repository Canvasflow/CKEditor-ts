import { View, ViewCollection, ButtonView } from "@ckeditor/ckeditor5-ui";
import CanvasflowEditor from "../../BaseEditor";
import { TextSizeView } from "./TextSizeView";
import { Locale } from "@ckeditor/ckeditor5-utils";
import minus from "../../assets/icons/minusIcon.svg?raw";
import plus from "../../assets/icons/plusIcon.svg?raw";

export class TextSizeComponent extends View {
  static viewName = "fontSizeInputCF";
  private items: ViewCollection;
  private iconButton?: ButtonView;
  private viewer: TextSizeViewer;
  input: TextSizeView;

  constructor(viewer: TextSizeViewer) {
    super(viewer.locale);
    this.viewer = viewer;
    this.items = this.createCollection();
    this.input = new TextSizeView(viewer);
    this.init();
  }

  private init() {
    this.items.add(this.sizeDown("", minus));
    this.items.add(this.input);
    this.items.add(this.sizeUp("", plus));
  }

  private sizeUp(label: string, icon: any) {
    this.iconButton = this.createButtonObject(label, icon, "");
    this.iconButton.isEnabled = true;
    this.iconButton.class = "text-size-icon";
    this.iconButton.on("execute", () => {
      this.viewer.onIncreaseSize();
    });
    return this.iconButton;
  }

  private sizeDown(label: string, icon: any) {
    this.iconButton = this.createButtonObject(label, icon, "");
    this.iconButton.isEnabled = true;
    this.iconButton.class = "text-size-icon";
    this.iconButton.on("execute", () => {
      this.viewer.onDecreaseSize();
    });
    return this.iconButton;
  }

  private createButtonObject(label: any, icon: any, className: any) {
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

export interface TextSizeViewer {
  editor: CanvasflowEditor;
  locale?: Locale;
  min: number;
  max: number;
  step: number;
  onChange: (value: string) => void;
  onIncreaseSize: () => void;
  onDecreaseSize: () => void;
}

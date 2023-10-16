import CanvasflowEditor from "../../BaseEditor";
import { View, ViewCollection, ButtonView } from "@ckeditor/ckeditor5-ui";
import { FontSizeView } from "./FontSizeView";
import { Locale } from "@ckeditor/ckeditor5-utils";
import { getIcon } from "../../icons/icons";

export class FontSizeComponent extends View {
  static viewName = "fontSizeInputCF";
  private items: ViewCollection;
  private iconButton?: ButtonView;
  private viewer: FontSizeViewer;
  input: FontSizeView;

  constructor(viewer: FontSizeViewer) {
    super(viewer.locale);
    this.viewer = viewer;
    this.items = this.createCollection();
    this.input = new FontSizeView(viewer);
    this.init();
  }

  private init() {
    //this.items.add(this.sizeDown("Decrease Font Size", getIcon("minus")));
    this.items.add(this.input);
    // this.items.add(this.sizeUp("Increase Font Size", getIcon("plus")));
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
      withText: false,
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

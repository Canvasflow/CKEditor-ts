import { View } from "@ckeditor/ckeditor5-ui";
import { FontSizeViewer } from "./FontSizeComponent";

export class FontSizeView extends View {
  static viewName = "fontSizeInputCF";
  declare value: string;
  constructor(viewer: FontSizeViewer) {
    const { min, max, step, editor, onChange } = viewer;
    const { locale } = editor;
    super(locale);

    const bind = this.bindTemplate;
    this.set("value", "");

    this.setTemplate({
      tag: "input",
      attributes: {
        type: "number",
        value: bind.to("value"),
        title: "Font Size",
        tabindex: 0,
        min,
        max,
        step,
        style: {
          width: "45px",
          border: "1px solid #c3c3c3",
          borderRadius: "4px",
          margin: "0px 0px",
          paddingLeft: "4px",
        },
      },
    });

    this.on("change:value", (evt) => {
      if (!evt.source) {
        return;
      }
      const source: any = evt.source;
      const value = `${source.value}`;
      onChange(`${value}`);
    });

    this.on("render", () => {
      this.element!.addEventListener("change", (evt: any) => {
        const { target } = evt;
        this.set("value", `${target.value}`);
      });
    });
  }
}

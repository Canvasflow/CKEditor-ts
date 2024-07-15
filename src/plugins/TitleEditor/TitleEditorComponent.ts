import { View } from "@ckeditor/ckeditor5-ui";

export class TitleEditorComponentView extends View {
  static viewName = "TitleEditorInputCF";
  declare value: string;
  constructor(viewer: any) {
    const { editor, onChange } = viewer;
    const { locale } = editor;
    super(locale);

    const bind = this.bindTemplate;
    this.set("value", "");

    this.setTemplate({
      tag: "input",
      attributes: {
        type: "string",
        value: bind.to("value"),
        placeholder: "Value",
        tabindex: 0,
        style: {
          width: "80%",
          marginLeft: "10%",
          marginTop: "20px",
          border: "1px solid #c3c3c3",
          borderRadius: "4px",
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

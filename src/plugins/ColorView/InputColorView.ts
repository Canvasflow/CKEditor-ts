import {
    View,
    InputView,
} from "@ckeditor/ckeditor5-ui";
import { Locale } from "@ckeditor/ckeditor5-utils";

export class InputColorView extends View<HTMLInputElement> {
    declare value: string;
    constructor({ locale, onChange }: InputColorViewer) {
        super(locale);
        const bind = this.bindTemplate;
        this.set("value", "");
        this.setTemplate({
            tag: "input",
            attributes: {
                type: "color",
                value: bind.to("value"),
                tabindex: 0,
                class: 'ck-input-color'
            },
        });
        this.on("change:value", (evt) => {
            if (!evt.source) {
                return;
            }
            const source: any = evt.source;
            const value = `${source.value}`;
            onChange(value);
        });

        this.on("render", () => {
            this.element!.addEventListener("change", (evt: any) => {
                const { target } = evt;
                this.set("value", `${target.value}`);
            });
        });
    }
}

interface InputColorViewer {
    locale: Locale;
    onChange: (color: string) => void;
}
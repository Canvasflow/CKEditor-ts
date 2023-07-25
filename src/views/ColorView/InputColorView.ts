import {
    View,
    ButtonView
} from "@ckeditor/ckeditor5-ui";
import { Locale } from "@ckeditor/ckeditor5-utils";
import picker from "../../assets/icons/colorPicker.svg?raw";

export class InputColorView extends View<HTMLInputElement> {
    button: ButtonView;
    input: InputColor;
    declare value: string;
    constructor({ locale, onChange }: InputColorViewer) {
        super(locale);
        this.button = this.getButtonView();
        this.input = new InputColor({ locale, onChange });
        this.setTemplate({
            tag: "div",
            attributes: {
                tabindex: 0,
                class: 'ck-input-color'
            },
            children: [
                this.button,
                this.input
            ]
        });
    }

    private getButtonView(): ButtonView {
        const button = new ButtonView();
        button.set({
            label: "Select color",
            icon: picker,
            type: 'button',
            tooltip: true,
            class: 'submit-color-button',
            withText: true,
        });
        button.on("execute", () => {
            this.input.element?.click();
        });
        return button;
    }
}

export class InputColor extends View<HTMLInputElement> {
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
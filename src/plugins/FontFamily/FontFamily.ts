import { FontFamilyUI } from "./FontFamilyUI";

import { Plugin } from "@ckeditor/ckeditor5-core";

export class FontFamily extends Plugin {
    static get requires() {
        return [FontFamilyUI];
    }
}

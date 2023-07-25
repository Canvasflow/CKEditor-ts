import { Plugin } from "@ckeditor/ckeditor5-core";

import CanvasflowEditor from "../../BaseEditor";
import { FontFamilyViewer, FontFamilyView } from './FontFamilyView';


export class FontFamily extends Plugin implements FontFamilyViewer {
    static viewName = "cf-font-family";
    declare editor: CanvasflowEditor;
    fonts: string[] = [];

    init() {
        this.fonts = this.editor.fonts;
        if (!this.fonts.length) {
            return;
        }

        this.editor.ui.componentFactory.add(FontFamily.viewName, this.renderView);
    }

    renderView = () => {
        return new FontFamilyView(this);
    }

    onSelectFont = (font: string) => {
        this.editor.execute("fontFamily", { value: font });
    }
}

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import CanvasflowEditor from "../../BaseEditor";

import { FontFamilyViewer, FontFamilyView } from './FontFamilyView';
export class FontFamilyUI extends Plugin implements FontFamilyViewer {
    declare editor: CanvasflowEditor;
    fonts: string[] = [];

    init() {
        this.fonts = this.editor.fonts;
        if (!this.fonts.length) {
            return;
        }

        this.createView();
    }

    private createView() {
        const fontFamilyView = new FontFamilyView(this);
        this.editor.ui.componentFactory.add('fontFamilyCF', () => {
            return fontFamilyView;
        });
    }

    onSelectFont = (font: string) => {
        this.editor.execute("fontFamily", { value: font });
    }
}

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import CanvasflowEditor from "../../BaseEditor";

import { FontStylesViewer } from './FontStylesViewer';
import { BoldView } from './BoldView'
export class FontStyles extends Plugin implements FontStylesViewer {
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
        this.editor.ui.componentFactory.add(BoldView.viewName, () => {
            return new BoldView(this);
        });
    }

    onClickBold = () => {
        this.editor.execute('bold');
    };
}
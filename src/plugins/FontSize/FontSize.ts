import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import CanvasflowEditor from "../../BaseEditor";
import { FontSizeView, FontSizeViewer } from "./FontSizeView";

export class FontSize extends Plugin implements FontSizeViewer {
    declare editor: CanvasflowEditor;
    private view: FontSizeView;
    min: number = 8;
    max: number = 50;
    step: number = 1;
    constructor(editor: CanvasflowEditor) {
        super(editor);
        this.view = new FontSizeView(this)
    }

    init() {
        this.editor.ui.componentFactory.add(FontSizeView.viewName, () => {
            return this.view;
        });

        this.view.on('change:value', (evt) => {
            if (!evt.source) {
                return;
            }
            const source: any = evt.source;
            const value = `${source.value}px`;
            console.log(`The value is: "${value}"`);
            this.editor.execute(`fontSize`, { value });
        })
    }

    onChange = (size: string) => {
        const value = `${size}px`;
        this.editor.execute(`fontSize`, { value });
    };
}


import { BalloonEditor } from "@ckeditor/ckeditor5-editor-balloon";
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';

export default abstract class BaseCanvasflowEditor extends BalloonEditor {
    protected constructor(sourceElementOrData: HTMLElement | string, config?: CanvasflowEditorConfig) {
        super(sourceElementOrData, config);
    }

    static create(sourceElementOrData: HTMLElement | string, config?: CanvasflowEditorConfig): Promise<BalloonEditor> {
        return super.create(sourceElementOrData, config);
    }
}

export interface CanvasflowEditorConfig extends EditorConfig {
    fontColors?: Array<string>
}
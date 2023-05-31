import { BalloonEditor } from "@ckeditor/ckeditor5-editor-balloon";
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';

export default abstract class BaseEditor extends BalloonEditor {
    anchorFn?: AnchorFn
    protected constructor(sourceElementOrData: HTMLElement | string, config?: TextEditorConfig) {
        super(sourceElementOrData, config);
        if (config?.fetchAnchors) {
            this.anchorFn = config.fetchAnchors;
        }
    }

    static create(sourceElementOrData: HTMLElement | string, config?: TextEditorConfig): Promise<BalloonEditor> {
        return super.create(sourceElementOrData, config);
    }
}

export interface TextEditorConfig extends EditorConfig {
    fontColors?: Array<string>
    pageLinkSources?: Array<PageLinkSource>
    fetchAnchors?: AnchorFn;
}

export interface PageLinkSource {
    id: string
    title: string

}

export interface PageAnchorSource {
    id: string;
    title: string;
}

export type AnchorFn = (id: string) => Promise<Array<PageAnchorSource>>

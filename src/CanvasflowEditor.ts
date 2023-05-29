import BaseCanvasflowEditor, { CanvasflowEditorConfig } from "./BaseCanvasflowEditor";


export class CanvasflowEditor extends BaseCanvasflowEditor {
    constructor(sourceElementOrData: HTMLElement | string, config?: CanvasflowEditorConfig) {
        console.log(`Custom canvaflow editor loaded`)
        super(sourceElementOrData, config);
    }
}

import {
    ButtonView
} from '@ckeditor/ckeditor5-ui';

import icon from './../../assets/icons/bold.svg?raw'

import { FontStylesViewer } from './FontStylesViewer';

export class BoldView extends ButtonView {
    static viewName = 'boldCF'
    constructor(viewer: FontStylesViewer) {
        super(viewer.editor.locale)
        this.label = 'Bold';
        this.icon = icon;
        this.tooltip = true;
        this.withText = false;
        this.listenTo(this, 'execute', () => {
            viewer.onClickBold();
        });
    }
}
// import classes from './FontFamily.module.css';
import {
    Model,
    addListToDropdown,
    DropdownView,
    DropdownButtonView,
    DropdownPanelView,
    ListDropdownButtonDefinition
} from '@ckeditor/ckeditor5-ui';
import CanvasflowEditor from "../../BaseEditor";
import { Collection } from '@ckeditor/ckeditor5-utils';

const EMPTY_LABEL = '-';

export class FontFamilyView extends DropdownView {
    private viewer: FontFamilyViewer;
    private editor: CanvasflowEditor;
    private collection?: Collection<ListDropdownButtonDefinition>
    static viewName: string = 'fontFamilyCF';
    constructor(viewer: FontFamilyViewer) {
        const { editor } = viewer;
        const { locale } = editor;
        const button = new DropdownButtonView(locale);
        const panel = new DropdownPanelView(locale);
        super(locale, button, panel);
        this.editor = editor;
        this.class = ['cf-font-family'].join(' ');
        this.viewer = viewer;
        this.init();
    }

    private init() {
        this.initButton();
        this.initPanel();
        const { model } = this.editor;
        const { document } = model;
        document.selection.on('change:range', this.onSelectionChange);
    }

    private onSelectionChange = () => {
        const { selection } = this.editor.model.document;
        if (!selection) {
            return;
        }
        const range = selection.getFirstRange();
        if (!range) {
            return;
        }

        const fonts = [];
        for (const item of range.getItems()) {
            if (item.hasAttribute('fontFamily')) {
                fonts.push(item.getAttribute('fontFamily'));
                continue;
            }
            fonts.push('');
        }

        const filteredEmpty = fonts.filter(i => !!i);

        /*
            - If all selection are empty set the label as empty
            - If one range has a font and at least one of 
                the other doesnt returns empty
        */

        if (!filteredEmpty.length || (filteredEmpty.length !== fonts.length)) {
            this.buttonView.set({
                label: EMPTY_LABEL
            })

            return;
        }

        const fontSet = new Set([...filteredEmpty]);

        // If there is more then one return empty
        if (fontSet.size > 1) {
            this.buttonView.set({
                label: EMPTY_LABEL
            })

            return;
        }

        const fontFamily = [...fontSet][0];

        this.buttonView.set({
            label: fontFamily
        });
    }

    private initButton() {
        this.buttonView.set({
            label: '-',
            withText: true,
        });
    }

    initPanel = () => {
        const { fonts, onSelectFont } = this.viewer;
        this.collection = fonts.reduce(
            reduceCollection,
            new Collection()
        );
        addListToDropdown(this, this.collection);
        this.on('execute', (evt) => {
            const source: any = evt.source;
            const { data } = source;
            const { index } = data;
            const font = fonts[index];
            this.applyClassToSelectedFont(index);
            console.log(`Selected font "${font}"`);
            /*Close the panel without closing the toolbar*/
            this.isOpen = false;
            this.focus()
            this.buttonView.set({
                label: font
            });

            onSelectFont(font);
        });
    }

    applyClassToSelectedFont = (index: number) => {
        const { fonts } = this.viewer;
        for (let i = 0; i < fonts.length; i++) {
            const item = this.collection?.get(i);
            const classNames = ['cf-button'];
            if (!item) {
                continue;
            }
            if (i === index) {
                classNames.push('selected');
            }

            item.model.class = classNames.join(' ');
        }

    }
}


function reduceCollection(acc: Collection<ListDropdownButtonDefinition>, font: string, index: number) {
    const model = new Model({
        label: font,
        class: 'cf-button',
        withText: true,
    });
    model.set('data', {
        font,
        index,
    });
    acc.add({
        type: 'button',
        model,
    });
    return acc;
}


export interface FontFamilyViewer {
    editor: CanvasflowEditor;
    fonts: Array<string>;
    onSelectFont: (font: string) => void;
}
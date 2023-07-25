import {
    ColorGridView,
    ColorTileView,
} from "@ckeditor/ckeditor5-ui";
import { Locale, Collection, GetCallback, BaseEvent } from "@ckeditor/ckeditor5-utils";
import { Color } from "../../BaseEditor";

export class CustomColorGridView extends ColorGridView {
    private colors: Collection<Color>;
    private colorSet: Set<string>

    private onClickColor: GetCallback<BaseEvent>;
    constructor(viewer: GridViewer) {
        const { locale, colors, onClickColor } = viewer;
        super(locale, { columns: 4, colorDefinitions: [] });
        const uniqueColors = getUniqueColors(colors);
        this.colorSet = new Set(uniqueColors.map(c => c.color));
        this.onClickColor = onClickColor;
        this.colors = new Collection(uniqueColors);
        this.items.bindTo(this.colors).using(this.mapColor());
        this.on('add:color', (_, color: Color) => {
            this.colors.add(color);
            this.colorSet.add(color.color);
        })
    }

    add = (color: Color) => {
        console.log(`IN GRID VIEW`, color);
        if (this.colorSet.has(color.color)) {
            return;
        }
        this.fire('add:color', color)
    }

    selectColor(color: string) {
        this.selectedColor = color;
        for (const c of this.colors) {
            c.selected = c.color === color;
        }
    }

    private mapColor() {
        const { onClickColor, locale } = this;
        return (color: Color): ColorTileView => {
            const colorTileView = new ColorTileView(locale);
            colorTileView.label = color.label;
            colorTileView.color = color.color;
            colorTileView.class = color.selected ? "selected-color" : "";
            colorTileView.on("execute", onClickColor);
            return colorTileView;
        };
    }
}

interface GridViewer {
    locale: Locale;
    colors: Array<Color>;
    onClickColor: GetCallback<BaseEvent>
}

function getUniqueColors(colorList: Array<Color>): Array<Color> {
    const colorsSet = new Set();
    const colors: Array<Color> = colorList.reduce(
        (acc: Array<Color>, color: Color) => {
            if (colorsSet.has(color.color)) {
                return acc;
            }
            colorsSet.add(color.color);
            acc.push(color);
            return acc;
        },
        [],
    );
    return colors;
}
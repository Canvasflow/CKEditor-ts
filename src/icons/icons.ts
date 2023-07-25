import alignCenter from "./assets/alignCenter.svg?raw";
import alignLeft from "./assets/alignLeft.svg";
import alignment from "./assets/alignment.svg";
import alignRight from "./assets/alignRight.svg";
import bold from "./assets/bold.svg?raw";
import bulletList from "./assets/bulletList.svg?raw";
import characters from "./assets/characters.svg?raw";
import clearFormatting from "./assets/clearFormatting.svg?raw";
import colorPicker from "./assets/colorPicker.svg?raw";
import darkmode from "./assets/darkmode.svg?raw";
import fontBackground from "./assets/fontBackground.svg?raw";
import fontColor from "./assets/fontColor.svg?raw";
import fontFamily from "./assets/fontFamily.svg?raw";
import fontSize from "./assets/fontSize.svg?raw";
import fontStyles from "./assets/fontStyles.svg?raw";
import goToPage from "./assets/goToPage.svg?raw";
import image from "./assets/image.svg?raw";
import italic from "./assets/italic.svg?raw";
import justify from "./assets/justify.svg";
import link from "./assets/link.svg?raw";
import list from "./assets/list.svg?raw";
import minus from "./assets/minusIcon.svg";
import numberedList from "./assets/numberedList.svg";
import other from "./assets/other.svg";
import plus from "./assets/plusIcon.svg";
import removeColor from "./assets/removeColor.svg";
import striketrough from "./assets/striketrough.svg";
import subscript from "./assets/subscript.svg";
import superscript from "./assets/superscript.svg";
import textFormatting from "./assets/textFormatting.svg";
import underline from "./assets/underline.svg";

export function getIcon(name: IconType) {
    switch (name) {
        case 'alignCenter':
            return alignCenter;
        case 'alignLeft':
            return alignLeft;
        case 'alignment':
            return alignment;
        case 'alignRight':
            return alignRight;
        case 'bold':
            return bold;
        case 'bulletList':
            return bulletList;
        case 'characters':
            return characters;
        case 'clearFormatting':
            return clearFormatting;
        case 'colorPicker':
            return colorPicker;
        case 'darkmode':
            return darkmode;
        case 'fontBackground':
            return fontBackground;
        case 'fontColor':
            return fontColor;
        case 'fontFamily':
            return fontFamily;
        case 'fontSize':
            return fontSize;
        case 'fontStyles':
            return fontStyles;
        case 'goToPage':
            return goToPage;
        case 'image':
            return image;
        case 'italic':
            return italic;
        case 'justify':
            return justify;
        case 'link':
            return link;
        case 'list':
            return list;
        case 'minus':
            return minus;
        case 'numberedList':
            return numberedList;
        case 'other':
            return other;
        case 'plus':
            return plus;
        case 'removeColor':
            return removeColor;
        case 'striketrough':
            return striketrough;
        case 'subscript':
            return subscript;
        case 'superscript':
            return superscript;
        case 'textFormatting':
            return textFormatting;
        case 'underline':
            return underline;
    }
}

type IconType = 'alignCenter' | 'alignLeft' | 'alignment' |
    'alignRight' | 'bold' | 'bulletList' | 'characters' | 'clearFormatting' |
    'colorPicker' | 'darkmode' | 'fontBackground' | 'fontColor' | 'fontFamily' |
    'fontSize' | 'fontStyles' | 'goToPage' | 'image' | 'italic' | 'justify' |
    'link' | 'list' | 'minus' | 'numberedList' | 'other' | 'plus' |
    'removeColor' | 'striketrough' | 'subscript' | 'superscript' |
    'textFormatting' | 'underline';


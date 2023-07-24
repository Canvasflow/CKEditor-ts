import fontStyles from "./assets/icons/fontStyles.svg?raw";

export function getIcon(name: IconType) {
    switch (name) {
        case 'fontStyles':
            return fontStyles;
    }
}

type IconType = 'fontStyles'
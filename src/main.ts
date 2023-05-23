import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { BalloonEditor } from "@ckeditor/ckeditor5-editor-balloon";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
} from "@ckeditor/ckeditor5-basic-styles";

import { List } from "@ckeditor/ckeditor5-list";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Font } from "@ckeditor/ckeditor5-font";
import { Alignment } from "@ckeditor/ckeditor5-alignment";

import { Link } from "@ckeditor/ckeditor5-link";

import {
  Image,
  ImageInsert,
  AutoImage,
  ImageResizeEditing,
  ImageResizeHandles,
} from "@ckeditor/ckeditor5-image";
import { DarkMode } from "./plugins/darkMode/DarkMode";
import { Base64UploadAdapter } from "@ckeditor/ckeditor5-upload";

import {
  SpecialCharacters,
  SpecialCharactersEssentials,
} from "@ckeditor/ckeditor5-special-characters";

import { Colors } from "./plugins/colors/Colors";
import { defaultColors, customColorsSet } from "./plugins/colors/ColorValues";

import { Timestamp } from "./plugins/custom";

function SpecialCharactersEmoji(editor: any) {
  editor.plugins.get("SpecialCharacters").addItems(
    "Emoji",
    [
      { title: "smiley face", character: "😊" },
      { title: "rocket", character: "🚀" },
      { title: "wind blowing face", character: "🌬️" },
      { title: "floppy disk", character: "💾" },
      { title: "heart", character: "❤️" },
    ],
    { label: "Emoticons" },
  );
  editor.plugins.get("SpecialCharacters").addItems(
    "Custom",
    [
      { title: "&quot;", character: '"' },
      { title: "&amp;", character: "&" },
      { title: "&lt;", character: "<" },
      { title: "&gt;", character: ">" },
      { title: "&iexcl;", character: "¡" },
      { title: "&cent;", character: "¢" },
      { title: "&pound;", character: "£" },
      { title: "&curren;", character: "¤" },
      { title: "&yen;", character: "¥" },
      { title: "&brvbar;", character: "¦" },
      { title: "&sect;", character: "§" },
      { title: "&sect;", character: "§" },
      { title: "&uml;", character: "¨" },
      { title: "&copy;", character: "©" },
      { title: "&copy;", character: "©" },
      { title: "&ordf;", character: "ª" },
      { title: "&laquo;", character: "«" },
      { title: "&not;", character: "¬" },
      { title: "&not;", character: "¬" },
      { title: "&reg;", character: "®" },
      { title: "&reg;", character: "®" },
      { title: "&macr;", character: "¯" },
      { title: "&deg;", character: "°" },
      { title: "&plusmn;", character: "±" },
      { title: "&sup2;", character: "²" },
      { title: "&sup2;", character: "²" },
      { title: "&sup3;", character: "³" },
      { title: "&sup3;", character: "³" },
      { title: "&acute;", character: "´" },
      { title: "&micro;", character: "µ" },
      { title: "&para;", character: "¶" },
      { title: "&para;", character: "¶" },
      { title: "&middot;", character: "·" },
      { title: "&cedil;", character: "¸" },
      { title: "&sup1;", character: "¹" },
      { title: "&sup1;", character: "¹" },
      { title: "&ordm;", character: "º" },
      { title: "&raquo;", character: "»" },
      { title: "&frac14;", character: "¼" },
      { title: "&frac12;", character: "½" },
      { title: "&frac34;", character: "¾" },
      { title: "&iquest;", character: "¿" },
      { title: "&times;", character: "×" },
      { title: "&divide;", character: "÷" },
      { title: "&fnof;", character: "ƒ" },
      { title: "&tilde;", character: "~" },
      { title: "&ndash;", character: "–" },
      { title: "&mdash;", character: "—" },
      { title: "&lsquo;", character: "‘" },
      { title: "&rsquo;", character: "’" },
      { title: "&sbquo;", character: "‚" },
      { title: "&ldquo;", character: "“" },
      { title: "&rdquo;", character: "”" },
      { title: "&bdquo;", character: "„" },
      { title: "&dagger;", character: "†" },
      { title: "&Dagger;", character: "‡" },
      { title: "&bull;", character: "•" },
      { title: "&hellip;", character: "…" },
      { title: "&permil;", character: "‰" },
      { title: "&permil;", character: "‰" },
      { title: "&prime;", character: "′" },
      { title: "&Prime;", character: "″" },
      { title: "&lsaquo;", character: "‹" },
      { title: "&rsaquo;", character: "›" },
      { title: "&oline;", character: "‾" },
      { title: "&frasl;", character: "⁄" },
      { title: "&euro;", character: "€" },
      { title: "&image;", character: "ℑ" },
      { title: "&weierp;", character: "℘" },
      { title: "&real;", character: "ℜ" },
      { title: "&trade;", character: "™" },
      { title: "&trade;", character: "™" },
      { title: "&alefsym;", character: "ℵ" },
      { title: "&larr;", character: "←" },
      { title: "&uarr;", character: "↑" },
      { title: "&rarr;", character: "→" },
      { title: "&darr;", character: "↓" },
      { title: "&harr;", character: "↔" },
      { title: "&crarr;", character: "↵" },
      { title: "&lArr;", character: "⇐" },
      { title: "&uArr;", character: "⇑" },
      { title: "&rArr;", character: "⇒" },
      { title: "&dArr;", character: "⇓" },
      { title: "&hArr;", character: "⇔" },
      { title: "&forall;", character: "∀" },
      { title: "&part;", character: "∂" },
      { title: "&exist;", character: "∃" },
      { title: "&empty;", character: "∅" },
      { title: "&nabla;", character: "∇" },
      { title: "&isin;", character: "∈" },
      { title: "&notin;", character: "∉" },
      { title: "&ni;", character: "∋" },
      { title: "&prod;", character: "∏" },
      { title: "&sum;", character: "∑" },
      { title: "&minus;", character: "−" },
      { title: "&lowast;", character: "∗" },
      { title: "&radic;", character: "√" },
      { title: "&prop;", character: "∝" },
      { title: "&infin;", character: "∞" },
      { title: "&ang;", character: "∠" },
      { title: "&and;", character: "∧" },
      { title: "&or;", character: "∨" },
      { title: "&cap;", character: "∩" },
      { title: "&cup;", character: "∪" },
      { title: "&int;", character: "∫" },
      { title: "&there4;", character: "∴" },
      { title: "&sim;", character: "∼" },
      { title: "&cong;", character: "≅" },
      { title: "&asymp;", character: "≈" },
      { title: "&ne;", character: "≠" },
      { title: "&equiv;", character: "≡" },
      { title: "&le;", character: "≤" },
      { title: "&ge;", character: "≥" },
      { title: "&sub;", character: "⊂" },
      { title: "&sup;", character: "⊃" },
      { title: "&nsub;", character: "⊄" },
      { title: "&sube;", character: "⊆" },
      { title: "&supe;", character: "⊇" },
      { title: "&oplus;", character: "⊕" },
      { title: "&otimes;", character: "⊗" },
      { title: "&perp;", character: "⊥" },
      { title: "&sdot;", character: "⋅" },
      { title: "&spades;", character: "♠" },
      { title: "&clubs;", character: "♣" },
      { title: "&hearts;", character: "♥" },
      { title: "&diams;", character: "♦" },
      { title: "&frac13;", character: "⅓" },
      { title: "&frac14;", character: "¼" },
      { title: "&frac34;", character: "¾" },
      { title: "&frac78;", character: "⅞" },
      { title: "&frac58;", character: "⅝" },
      { title: "&frac38;", character: "⅜" },
      { title: "&frac23;", character: "⅔" },
      { title: "&frac35;", character: "⅗" },
      { title: "&frac25;", character: "⅖" },
      { title: "&frac18;", character: "⅛" },
      { title: "&frac45;", character: "⅘" },
      { title: "&frac15;", character: "⅕" },
      { title: "&frac16;", character: "⅙" },
      { title: "&shy;", character: "­" },
      { title: "&nbsp;", character: "" },
    ],
    {
      label: "Custom Characters",
    },
  );
}

BalloonEditor.create(document.querySelector("#editor") as HTMLElement, {
  plugins: [
    Essentials,
    Bold,
    Italic,
    List,
    Paragraph,
    Underline,
    Strikethrough,
    Subscript,
    Superscript,
    Font,
    Alignment,
    Link,
    Timestamp,
    SpecialCharacters,
    SpecialCharactersEssentials,
    SpecialCharactersEmoji,
    Base64UploadAdapter,
    Image,
    ImageInsert,
    AutoImage,
    ImageResizeEditing,
    ImageResizeHandles,
    Colors,
    DarkMode,
    Timestamp,
  ],
  toolbar: [
    "link",
    "fontFamily",
    "fontSize",
    "colorPicker",
    "fontBackgroundColor",
    "|",
    "bold",
    "italic",
    "underline",
    "bulletedList",
    "numberedList",
    "strikethrough",
    "subscript",
    "superscript",
    "|",
    "alignment",
    "|",
    "specialCharacters",
    "insertImage",
    "dark-mode",
    "timestamp",

    // {
    //   label: "More basic styles",
    //   icon: "plus",
    //   items: ["strikethrough", "superscript", "subscript"],
    // },
  ],
  fontFamily: {
    options: [
      "default",
      "Ubuntu, Arial, sans-serif",
      "Ubuntu Mono, Courier New, Courier, monospace",
    ],
  },
  fontSize: {
    options: Array.from({ length: 80 }, (_, i) => i + 1),
  },
  alignment: {
    options: ["left", "right", "center", "justify"],
  },
  fontBackgroundColor: {
    colors: [
      {
        color: "hsl(0, 75%, 60%)",
        label: "Red",
      },
      {
        color: "hsl(30, 75%, 60%)",
        label: "Orange",
      },
      {
        color: "hsl(60, 75%, 60%)",
        label: "Yellow",
      },
      {
        color: "hsl(90, 75%, 60%)",
        label: "Light green",
      },
      {
        color: "hsl(120, 75%, 60%)",
        label: "Green",
      },
    ],
  },
})
  .then(() => {
    localStorage.setItem("defaultColors", JSON.stringify(defaultColors));
    localStorage.setItem(
      "customColorsSet",
      JSON.stringify(JSON.stringify(Array.from(customColorsSet))),
    );
  })
  .catch((error) => {
    console.error(error);
  });

import { TextEditorConfig, PageAnchorSource } from "./BaseEditor";
import { TextEditor } from "./TextEditor";
import { createListeners } from "./listeners";
import { CustomEditor } from "./CustomEditor";
declare global {
  interface Window {
    CanvasflowTextEditor: any;
  }
}

if (typeof window !== "undefined") {
  window.CanvasflowTextEditor = (
    element: HTMLElement,
    config: TextEditorConfig,
  ) => {
    return TextEditor.create(element, config);
  };
}

const customColor = [
  { color: "yellow", label: "bright yellow" },
  { color: "grey", label: "dark grey" },
];
const customBackgroundColor = [{ color: "orange", label: "orange" }];

const config = {
  pageLinkSources: [
    {
      id: "1111",
      title: "Example",
    },
    {
      id: "1112",
      title: "Example 2",
    },
  ],
  fontFamily: {
    options: ["Georgia", "Ubuntu, Arial, sans-serif", "Times New Roman"],
  },
  fontSize: {
    options: Array.from({ length: 70 }, (_, i) => i + 8),
  },

  fetchAnchors,
  colors: {
    defaultColor: [
      { color: "red", label: "red" },
      { color: "blue", label: "blue" },
      { color: "orange", label: "orange" },
      { color: "teal", label: "teal" },
      { color: "magenta", label: "magenta" },
      { color: "grey", label: "grey" },
      { color: "green", label: "green" },
      { color: "#c3c3c3", label: "silver" },
    ],
    customColor,
  },
  fontBackground: {
    defaultColor: [{ color: "red", label: "red" }],
    customColor: customBackgroundColor,
  },
};

TextEditor.create(document.querySelector("#editor") as HTMLElement, config)
  .then((editor) => {
    createListeners(editor);
  })
  .catch((error) => {
    console.error(error);
  });

CustomEditor.build(document.querySelector("#editor2") as HTMLElement, config, [
  "bold",
  "separator",
  "FontFamily",
  "DarkMode",
  "FontColor",
])
  .then((editor) => {
    createListeners(editor);
  })
  .catch((error) => {
    console.error(error);
  });

async function fetchAnchors(id: string): Promise<Array<PageAnchorSource>> {
  if (id === "1111") {
    return [];
  }
  return [
    {
      id: "112233",
      title: "asdasdasdasd",
    },
  ];
}

import { TextEditorConfig, PageAnchorSource } from "./BaseEditor";
import { TextEditor } from "./TextEditor";
import { createListeners } from "./listeners";
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

TextEditor.create(document.querySelector("#editor") as HTMLElement, {
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
    options: [
      "default",
      "Ubuntu, Arial, sans-serif",
      "Ubuntu Mono, Courier New, Courier, monospace",
    ],
  },
  fontSize: {
    options: Array.from({ length: 70 }, (_, i) => i + 8),
  },

  fetchAnchors,
  colors: {
    defaultColor: [{ color: "red", label: "red" }],
    customColor: [{ color: "blue", label: "blue" }],
  },
  fontBackground: {
    defaultColor: [{ color: "orange", label: "orange" }],
    customColor: [{ color: "teal", label: "teal" }],
  },
})
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

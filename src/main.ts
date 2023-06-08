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
  link: {
    decorators: {
      openInNewTab: {
        mode: "manual",
        label: "Open in a new tab",
        attributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      },
    },
  },
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
    options: Array.from({ length: 60 }, (_, i) => i + 10),
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
  fetchAnchors,
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

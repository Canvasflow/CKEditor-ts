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


const customColor = [{ color: "teal", label: "teal" }];

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
    customColor,
  },
  fontBackground: {
    defaultColor: [{ color: "orange", label: "orange" }],
    customColor,
  },
}


TextEditor.create(document.querySelector("#editor") as HTMLElement, config)
  .then((editor) => {
    setTimeout(() => {
      console.log(`I add the color`);
      customColor.push({ color: '#000000', label: 'black' });
    }, 10000)
  })
  .catch((error) => {
    console.error(error);
  });


TextEditor.create(document.querySelector("#editor2") as HTMLElement, config)
  .then((editor) => {
    editor.addEventListener("colors:addCustomColor", (evt: any) => {
      const { color } = evt;
      console.log(`addCustomColor:`, color);
      customColor.push({ color, label: '' });
    });
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

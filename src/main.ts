import { defaultColors, customColorsSet } from "./plugins/Colors/ColorValues";
import { CanvasflowEditor } from './CanvasflowEditor'

CanvasflowEditor.create(document.querySelector("#editor") as HTMLElement, {
  pageLinkSources: [{
    id: '1111',
    title: 'Example'
  }, {
    id: '1112',
    title: 'Example 2'
  }],
  pageAnchorSources: [{
    id: 'CF-123123123',
    title: 'Component 1',
    articleId: '1111'
  }],
  fontColors: [
    'red'
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
      JSON.stringify(JSON.stringify(Array.from(customColorsSet)))
    );
  })
  .catch((error) => {
    console.error(error);
  });

import { TextEditorConfig } from "./BaseEditor";
import { TextEditor } from "./TextEditor";
import { CustomEditor } from "./CustomEditor";
import { version } from "./version";
//import { createListeners } from "./listeners";

declare global {
  interface Window {
    CanvasflowTextEditor: any;
    CanvasflowCustomTextEditor: any;
    editorVersion: string;
  }
}

if (typeof window !== "undefined") {
  window.editorVersion = version;
  window.CanvasflowTextEditor = (
    element: HTMLElement,
    config: TextEditorConfig,
  ) => {
    return TextEditor.create(element, config);
  };

  window.CanvasflowTextEditor.version = version;

  window.CanvasflowCustomTextEditor = (
    element: HTMLElement,
    config: TextEditorConfig,
    params: any,
  ) => {
    return CustomEditor.build(element, config, params);
  };

  window.CanvasflowCustomTextEditor.version = version;
}

// const customColor = [
//   { color: "yellow", label: "bright yellow" },
//   { color: "grey", label: "dark grey" },
// ];

// const customBackgroundColor = [{ color: "grey", label: "dark grey" }];

// const config = {
//   pageLinkSources: [
//     {
//       id: "1111",
//       title: "Example",
//     },
//     {
//       id: "1112",
//       title: "Example 2",
//     },
//     {
//       id: "1113",
//       title: "Example 3",
//     },
//     {
//       id: "1114",
//       title: "Example 4",
//     },
//     {
//       id: "1115",
//       title: "Example 5",
//     },
//     {
//       id: "1116",
//       title: "Example 6",
//     },
//     {
//       id: "1117",
//       title: "Example 7",
//     },
//     {
//       id: "1118",
//       title: "Example 8",
//     },
//     {
//       id: "1119",
//       title: "Example 9",
//     },
//     {
//       id: "1120",
//       title: "Example 10",
//     },
//   ],
//   fontFamily: {
//     options: ["Georgia", "Ubuntu, Arial, sans-serif", "Times New Roman"],
//   },
//   fontSize: {
//     options: Array.from({ length: 70 }, (_, i) => i + 8),
//   },

//   fetchAnchors,
//   colors: {
//     defaultColor: [
//       { color: "red", label: "red" },
//       { color: "blue", label: "blue" },
//       { color: "orange", label: "orange" },
//       { color: "teal", label: "teal" },
//       { color: "magenta", label: "magenta" },
//       { color: "grey", label: "grey" },
//       { color: "green", label: "green" },
//       { color: "#c3c3c3", label: "silver" },
//     ],
//     customColor,
//   },
//   fontBackground: {
//     defaultColor: [{ color: "red", label: "red" }],
//     customColor: customBackgroundColor,
//   },
//   caseChange: { titleCase: { excludeWords: [] } },
// };

// TextEditor.create(document.querySelector("#editor") as HTMLElement, config)
//   .then((editor) => {
//     editor.setData(
//       "<p>As he grew older, he became increasingly reclusive, eccentric and pessimistic, while his art grew wilder and more intense. His father’s death in 1829 provoked periods of depression and poor health, and his gallery fell into <u data-title='to fall into disrepair: deteriorarse, caer en el abandono'>disrepair</u><strong><sup>34</sup></strong>. He was sustained, however, by intimate relationships with his <u data-title='housekeeper: ama de llaves'>housekeeper</u><strong><sup>35</sup></strong>, Hannah Danby and her aunt, Sarah Danby. He had two daughters, Evelina and Georgiana, with either <u data-title='added new title'>Hannah</u> or Sarah, but kept this secret from the public. He finally recognised his parentage by leaving the two daughters money in his <u data-title='will: testamento'>will</u><strong><sup>36</sup></strong>. He had another lover called Mrs. Booth, the <u data-title='landlady: casera'>landlady</u><strong><sup>37</sup></strong> of the seaside house where he often stayed in Margate.</p>",
//     );
//     // editor.setData("<b bold-color=true>world</b>");
//     createListeners(editor);
//     editor.addEventListener("textColor:addCustomColor", (evt: any) => {
//       const { color } = evt;
//       customColor.push({ color, label: "" });
//     });
//     editor.addEventListener("highlightColor:addCustomColor", (evt: any) => {
//       const { color } = evt;
//       customBackgroundColor.push({ color, label: "" });
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// async function fetchAnchors(id: string): Promise<Array<PageAnchorSource>> {
//   if (id === "1111") {
//     return [];
//   }
//   return [
//     {
//       id: "112233",
//       title: "asdasdasdasd",
//     },
//   ];
// }

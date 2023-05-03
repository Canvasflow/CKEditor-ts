import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Underline } from "@ckeditor/ckeditor5-basic-styles";
// import BalloonEditor from "./lib/BalloonEditor";
import { BalloonEditor } from "@ckeditor/ckeditor5-editor-balloon";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";

const editorElement = document.querySelector("#editor") as HTMLElement;

BalloonEditor.create(editorElement, {
  plugins: [Bold],
  toolbar: {
    items: ["bold"],
  },
})
  .then((editor) => {
    // window.editor = editor;
  })
  .catch(console.error);

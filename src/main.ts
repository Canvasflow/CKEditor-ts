import Balloon from "@ckeditor/ckeditor5-build-balloon";

const editorPlaceholder = document.querySelector("#editor") as HTMLElement;

Balloon.create(editorPlaceholder).catch((error) => {
  console.error(error);
});

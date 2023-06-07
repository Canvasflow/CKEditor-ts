import { TextEditor } from "./TextEditor";

export function createListeners(editor: TextEditor) {
  //COLORS
  editor.addEventListener("addCustomColor", (evt: any) => {
    const { color } = evt;
    console.log(`addCustomColor:`, color);
  });
  editor.addEventListener("removeCustomColor", (evt: any) => {
    const { color } = evt;
    console.log(`removeCustomColor:`, color);
  });
  editor.addEventListener("selectedDefaultColor", (evt: any) => {
    const { color } = evt;
    console.log(`selectedDefaultColor:`, color);
  });

  //PAGE LINKS
  editor.addEventListener("selectedPage", (evt: any) => {
    const { page } = evt;
    console.log(`selectedPage:`, page);
  });
  editor.addEventListener("selectedAnchor", (evt: any) => {
    const { page } = evt;
    console.log(`selectedAnchor:`, page);
  });
  editor.addEventListener("addedPageLink", (evt: any) => {
    const { page } = evt;
    console.log(`addedPageLink:`, page);
  });

  //DARK MODE
  editor.addEventListener("selectedDarkMode", (evt: any) => {
    const { data } = evt;
    console.log(`selectedDarkMode:`, data);
  });

  //SPECIAL CHARACTERS
  editor.addEventListener("selectedSpecialCharacter", (evt: any) => {
    const { data } = evt;
    console.log(`selectedSpecialCharacter:`, data);
  });
}

import { TextEditor } from "./TextEditor";

export function createListeners(editor: TextEditor) {
  //COLORS
  editor.addEventListener("textColor:addCustomColor", (evt: any) => {
    const { color } = evt;
    console.log(`addCustomColor:`, color);
  });

  editor.addEventListener("textColor:removeCustomColor", (evt: any) => {
    const { color } = evt;
    console.log(`removeCustomColor:`, color);
  });
  editor.addEventListener("textColor:selectedDefaultColor", (evt: any) => {
    const { color } = evt;
    console.log(`selectedDefaultColor:`, color);
  });

  //BACKGROUND COLOR
  editor.addEventListener("highlightColor:addCustomColor", (evt: any) => {
    const { color } = evt;
    console.log(`addCustomhighlightColorColor:`, color);
  });

  //PAGE LINKS
  editor.addEventListener("pageLink:selectedPage", (evt: any) => {
    const { page } = evt;
    console.log(`selectedPage:`, page);
  });
  editor.addEventListener("pageLink:selectedAnchor", (evt: any) => {
    const { page } = evt;
    console.log(`selectedAnchor:`, page);
  });
  editor.addEventListener("pageLink:addedPageLink", (evt: any) => {
    const { page } = evt;
    console.log(`addedPageLink:`, page);
  });

  //DARK MODE
  editor.addEventListener("darkMode:selectedDarkMode", (evt: any) => {
    const { data } = evt;
    console.log(`selectedDarkMode:`, data);
  });

  //SPECIAL CHARACTERS
  editor.addEventListener(
    "specialCharacters:selectedSpecialCharacter",
    (evt: any) => {
      const { data } = evt;
      console.log(`selectedSpecialCharacter:`, data);
    },
  );

  //CHANGES TO DATA
  editor.addEventListener("changes:content", (evt: any) => {
    const { changes } = evt;
    // console.log(`changes:content:`, changes);
  });
}

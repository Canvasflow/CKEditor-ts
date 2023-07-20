import { TextEditor } from "./TextEditor";

export function createListeners(editor: TextEditor) {
  //COLORS
  editor.addEventListener("colors:addCustomColor", (evt: any) => {
    const { color } = evt;
    console.log(`addCustomColor:`, color);
  });
  editor.addEventListener("colors:addCustomColorToView", (evt: any) => {
    const { color } = evt;
    console.log(`addCustomColorToView:`, color);
  });
  editor.addEventListener("colors:removeCustomColor", (evt: any) => {
    const { color } = evt;
    console.log(`removeCustomColor:`, color);
  });
  editor.addEventListener("colors:selectedDefaultColor", (evt: any) => {
    const { color } = evt;
    console.log(`selectedDefaultColor:`, color);
  });

  //BACKGROUND COLOR
  editor.addEventListener("colors:addCustomBackgroundColor", (evt: any) => {
    const { color } = evt;
    console.log(`addCustomBackgroundColor:`, color);
  });
  editor.addEventListener(
    "colors:addCustomBackgroundColorToView",
    (evt: any) => {
      const { color } = evt;
      console.log(`addCustomBackgroundColorToView:`, color);
    },
  );

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
}

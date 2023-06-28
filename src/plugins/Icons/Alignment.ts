import { Plugin } from "ckeditor5/src/core";
import icon from "../../assets/icons/image.svg?raw";
import CanvasflowEditor from "../../BaseEditor";
import { DropdownView } from "@ckeditor/ckeditor5-ui";

export default class AlignmentIcon extends Plugin {
  declare editor: CanvasflowEditor;

  init() {
    setTimeout(() => {
      const editor = this.editor;

      const view = editor.ui.componentFactory.create(
        "alignment",
      ) as DropdownView;
      view.buttonView.icon = icon;
      view.buttonView.set({ tooltip: "tooltip", icon });
      view.buttonView.render();
      view.render();
    }, 1000);
  }
}

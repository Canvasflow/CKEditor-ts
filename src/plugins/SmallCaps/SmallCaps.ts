import CanvasflowEditor from "../../BaseEditor";
import { Plugin } from "@ckeditor/ckeditor5-core";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { SmallCapsEditing } from "./SmallCapsEditing";
import { SMALL_CAPS_COMMAND } from "./SmallCapsCommand";

export class SmallCaps extends Plugin {
  static viewName = "cf-small-caps";
  declare editor: CanvasflowEditor;

  init() {
    this.editor.ui.componentFactory.add(SmallCaps.viewName, this.renderView);
  }

  renderView = () => {
    const button = new ButtonView();
    button.label = "Small Caps";
    button.tooltip = false;
    button.withText = true;

    this.listenTo(button, "execute", () => {
      this.editor.execute(SMALL_CAPS_COMMAND, "small-caps");
    });
    return button;
  };

  static get requires() {
    return [SmallCapsEditing];
  }
}

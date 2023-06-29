import {
  AddCustomColorEvent,
  RemoveCustomColorEvent,
} from "./plugins/TextFontColor/TextFontColorEvents";
export type EditorEvents =
  // Colors
  AddCustomColorEvent | RemoveCustomColorEvent;

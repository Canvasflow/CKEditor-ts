import {
  AddCustomTextColorEvent,
  RemoveCustomTextColorEvent,
} from "./plugins/TextColor/TextColorEvents";
export type EditorEvents =
  // Colors
  AddCustomTextColorEvent | RemoveCustomTextColorEvent;

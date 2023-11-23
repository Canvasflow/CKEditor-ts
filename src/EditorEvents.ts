import {
  AddCustomTextColorEvent,
  RemoveCustomTextColorEvent,
} from "./plugins/TextColor/TextColorEvents";

export interface EditorChanges {
  changes: boolean;
}

export type EditorEvents =
  // Colors
  AddCustomTextColorEvent | RemoveCustomTextColorEvent | EditorChanges;

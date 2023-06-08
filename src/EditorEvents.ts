import { AddCustomColorEvent, RemoveCustomColorEvent } from './plugins/Colors/ColorsEvents'
export type EditorEvents =
    // Colors
    AddCustomColorEvent |
    RemoveCustomColorEvent;
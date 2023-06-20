import { BalloonEditor } from "@ckeditor/ckeditor5-editor-balloon";
import { EditorConfig } from "@ckeditor/ckeditor5-core/src/editor/editorconfig";
import { EditorEvents } from "./EditorEvents";

export default abstract class BaseEditor extends BalloonEditor {
  anchorFn?: AnchorFn;
  subscribers: Map<string, Function> = new Map();
  protected constructor(
    sourceElementOrData: HTMLElement | string,
    config?: TextEditorConfig,
  ) {
    super(sourceElementOrData, config);
    if (config?.fetchAnchors) {
      this.anchorFn = config.fetchAnchors;
    }
  }

  static create(
    sourceElementOrData: HTMLElement | string,
    config?: TextEditorConfig,
  ): Promise<BaseEditor> {
    return super.create(sourceElementOrData, config) as Promise<BaseEditor>;
  }

  addEventListener(key: string, cb: Function) {
    this.subscribers.set(key, cb);
  }

  dispatch(key: string, event?: EditorEvents) {
    const cb = this.subscribers.get(key);
    if (!cb) {
      return;
    }
    cb(event);
  }
}

export interface TextEditorConfig extends EditorConfig {
  colors?: Colors;
  pageLink?: {
    source: Array<PageLinkSource>;
    fetchAnchors?: AnchorFn;
  };
  pageLinkSources?: Array<PageLinkSource>;
  fontFamily?: { options: Array<string> };
  fetchAnchors?: AnchorFn;
  fontBackground?: Colors;
}

export interface Colors {
  defaultColor: Array<Color>;
  customColor: Array<Color>;
}

export interface Color {
  color: string;
  label: string;
}

export interface PageLinkSource {
  id: string;
  title: string;
}

export interface PageAnchorSource {
  id: string;
  title: string;
}

export type AnchorFn = (id: string) => Promise<Array<PageAnchorSource>>;

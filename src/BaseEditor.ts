import { BalloonEditor } from "@ckeditor/ckeditor5-editor-balloon";
import { EditorConfig } from "@ckeditor/ckeditor5-core/src/editor/editorconfig";
import { EditorEvents } from "./EditorEvents";

export default abstract class BaseEditor extends BalloonEditor {
  anchorFn?: AnchorFn;
  colors?: Colors;
  fontBackground?: Colors;
  subscribers: Map<string, Array<Function>> = new Map();
  fonts: Array<string> = [];
  public version: number = 0;
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
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, []);
    }
    const suscribers = this.subscribers.get(key);
    suscribers?.push(cb);
  }

  dispatch(key: string, event?: EditorEvents) {
    const cbs = this.subscribers.get(key);
    if (!cbs) {
      return;
    }
    for (const cb of cbs) {
      cb(event);
    }
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
  toolbar?: Array<string | GroupItem>;
}

export interface Colors {
  defaultColor: Array<Color>;
  customColor: Array<Color>;
}

export interface Color {
  color: string;
  label: string;
  selected?: boolean;
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

export interface GroupItem {
  label: string;
  icon: string;
  items: Array<string>;
}

import {
  View,
  ButtonView,
  submitHandler,
  LabelView,
  createDropdown,
  Model,
  addListToDropdown,
  ViewCollection,
  DropdownView,
} from "@ckeditor/ckeditor5-ui";
import { FocusTracker, Collection, Locale } from "@ckeditor/ckeditor5-utils";
import {
  GetCallback,
  BaseEvent,
} from "@ckeditor/ckeditor5-utils/src/emittermixin";
import { PageLinkSource } from "../../BaseEditor";

export class PageLinkView extends View {
  private items: ViewCollection;
  private focusTracker: FocusTracker;
  private pageLinkDropDown?: DropdownView;
  private addLinkButtonView?: ButtonView;
  private viewer: PageLinkViewer;
  private anchorDropdown?: DropdownView;
  private listDropdown?: DropdownView;

  constructor(viewer: PageLinkViewer) {
    super(viewer.locale);
    this.viewer = viewer;
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.initItems();
  }

  initItems() {
    this.items.add(this.createLabel("Insert Page Link"));
    this.createButton();
  }

  showView() {
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-page"],
      },
      children: this.items,
    });
  }

  createButton() {
    this.addLinkButtonView = this.createButtonObject(
      "Insert Link",
      ``,
      "button-blue",
    );
    this.addLinkButtonView.type = "submit";
    this.addLinkButtonView.isEnabled = true;
  }

  createPages(pageLinkSources: Array<PageLinkSource>) {
    this.pageLinkDropDown = this.getPageDropdown();
    const collection: Collection<any> = pageLinkSources.reduce(
      reduceCollection,
      new Collection(),
    );
    addListToDropdown(this.pageLinkDropDown, collection);
    this.items.add(this.pageLinkDropDown);
  }

  getPageDropdown() {
    this.listDropdown = createDropdown(this.locale);
    this.listDropdown.on("execute", this.viewer.onSelectPage);
    this.listDropdown.buttonView.set({
      label: "Select Page",
      withText: true,
    });
    this.listDropdown.id = "dropdown-element";
    return this.listDropdown;
  }

  insertButtonView() {
    this.items.add(this.createLabel(""));
    //this.addLinkButtonView?.set({ isVisible: true });
    // console.log(this.addLinkButtonView);
    // if (!this.addLinkButtonView?.isRendered)
    //   this.items.add(this.addLinkButtonView!);
  }

  removeButtonView() {
    if (this.addLinkButtonView) {
      // this.items.remove(this.addLinkButtonView);
      //this.addLinkButtonView.set({ isVisible: false });
    }
  }

  resetPageLinkDropdown() {
    this.listDropdown?.buttonView.set({
      label: "Select Page",
      withText: true,
    });
  }

  selectPage(page: string) {
    this.pageLinkDropDown?.buttonView.set({
      label: page,
      withText: true,
    });
  }

  selectAnchor(anchor: string) {
    this.anchorDropdown?.buttonView.set({
      label: anchor,
      withText: true,
    });
  }

  createAnchors(anchors: Array<PageLinkSource>) {
    this.items.add(this.createLabel(""));
    //this.removeAnchorDropdown();

    this.anchorDropdown = createDropdown(this.locale);
    this.anchorDropdown.on("execute", this.viewer.onSelectAnchor);

    this.anchorDropdown.buttonView.set({
      label: "Select Anchor",
      withText: true,
    });
    this.anchorDropdown.id = "dropdown-anchors";

    const collection: Collection<any> = anchors.reduce(
      reduceCollection,
      new Collection(),
    );
    addListToDropdown(this.anchorDropdown, collection);
    this.items.add(this.anchorDropdown);
  }

  removeAnchorDropdown() {
    if (this.anchorDropdown) {
      // this.items.remove(this.anchorDropdown);
      //this.anchorDropdown.set({ isVisible: false });
      this.anchorDropdown = undefined;
    }
  }

  render() {
    super.render();
    submitHandler({
      view: this,
    });
  }

  destroy() {
    super.destroy();
    this.focusTracker.destroy();
  }

  createButtonObject(label: any, icon: any, className: any) {
    const button = new ButtonView();
    button.set({
      label,
      icon,
      tooltip: true,
      class: className,
      withText: true,
    });

    return button;
  }

  createLabel(text: any) {
    const labelView = new LabelView(this.locale);
    labelView.text = text;
    labelView.extendTemplate({
      attributes: {
        class: ["ck", "ck-color-grid__label"],
      },
    });
    return labelView;
  }
}

export interface PageLinkViewer {
  locale?: Locale;
  onSelectPage: GetCallback<BaseEvent>;
  onSelectAnchor: GetCallback<BaseEvent>;
}

function reduceCollection(
  acc: Collection<any>,
  pageLink: PageLinkSource,
  index: number,
) {
  const { title } = pageLink;
  const model = new Model({
    label: title,
    withText: true,
  });
  model.set("data", {
    pageLink,
    index,
  });
  acc.add({
    type: "button",
    model,
  });
  return acc;
}

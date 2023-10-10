import { PageLinkSource } from "../../BaseEditor";
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

  private initItems() {
    this.addTitle();
    this.createAddButton();
  }

  private addTitle() {
    const label = "Article Reference";
    this.items.add(this.createLabel(label));
  }

  private createAddButton() {
    this.addLinkButtonView = this.createButtonObject(
      "Add",
      "",
      "page-link-button",
    );

    this.addLinkButtonView.type = "submit";
    this.addLinkButtonView.isEnabled = true;
  }

  /**
   * Create pages list from data
   *
   */
  createPages(pageLinkSources: Array<PageLinkSource>) {
    this.items.add(this.createSpacer());
    // for (let index = 0; index < pageLinkSources.length; index++) {
    //   if (index % 3 === 0) {
    //     this.items.add(this.createSpacer());
    //   }
    //   const page = pageLinkSources[index];
    //   this.createPageButton(page);
    // }
    this.pageLinkDropDown = this.getPageDropdown();
    const collection: Collection<any> = pageLinkSources.reduce(
      reduceCollection,
      new Collection(),
    );
    addListToDropdown(this.pageLinkDropDown, collection);
    this.items.add(this.pageLinkDropDown);
    this.items.add(this.createSpacer());
  }

  private getPageDropdown() {
    this.listDropdown = createDropdown(this.locale);
    this.listDropdown.on("execute", this.viewer.onSelectPage);
    this.listDropdown.buttonView.set({
      label: "Select Page",
      withText: true,
    });
    this.listDropdown.id = "dropdown-element";
    return this.listDropdown;
  }

  /**
   * Creates a div for group html elements
   *
   */
  insertButtonView() {
    if (!this.items.has(this.addLinkButtonView!)) {
      // this.items.add(this.createLabel(""));
      this.items.add(this.addLinkButtonView!);
    }
  }

  /**
   * Removes create page link button
   *
   */
  removeButtonView() {
    if (this.items.has(this.addLinkButtonView!)) {
      this.items.remove(this.addLinkButtonView!);
    }
  }

  /**
   * Clear values for page link
   *
   */
  resetPageLinkDropdown() {
    this.listDropdown?.buttonView.set({
      label: "Select Page",
      withText: true,
    });
  }

  /**
   * Page link value selected
   *
   */
  selectPage(page: string) {
    this.pageLinkDropDown?.buttonView.set({
      label: page,
      withText: true,
    });
  }

  /**
   * Anchor component value selected
   *
   */
  selectAnchor(anchor: string) {
    this.anchorDropdown?.buttonView.set({
      label: anchor,
      withText: true,
    });
  }

  /**
   * Anchor component value selected
   *
   */
  createAnchors(anchors: Array<PageLinkSource>) {
    this.items.add(this.createSpacer());
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

  /**
   * Removes anchor element from view
   *
   */
  removeAnchorDropdown() {
    if (this.anchorDropdown && this.items.has(this.anchorDropdown!)) {
      this.items.remove(this.anchorDropdown!);
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

  private createButtonObject(label: any, icon: any, className: any) {
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

  private createLabel(text: any) {
    const labelView = new LabelView(this.locale);
    labelView.text = text;
    labelView.extendTemplate({
      attributes: {
        class: ["ck", "ck-page-link_label"],
      },
    });
    return labelView;
  }

  private createSpacer() {
    const labelView = new LabelView(this.locale);
    labelView.text = "";
    labelView.extendTemplate({
      attributes: {
        class: ["ck", "ck-page-link_spacer"],
      },
    });
    return labelView;
  }

  /**
   * Insert elements into DOM
   *
   */
  showView() {
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-page", "page-link"],
      },
      children: this.items,
    });
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

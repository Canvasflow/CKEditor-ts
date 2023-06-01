import {
  View,
  ButtonView,
  submitHandler,
  LabelView,
  createDropdown,
  Model,
  addListToDropdown,
} from "@ckeditor/ckeditor5-ui";

import { FocusTracker, Collection } from "@ckeditor/ckeditor5-utils";
import CanvasflowEditor, { PageLinkSource } from "../../BaseEditor";

export class PageLinkView extends View {
  declare editor: CanvasflowEditor;
  pageLinkSources: Array<PageLinkSource> = [];
  columns: number | undefined;
  items: any;
  focusTracker: FocusTracker;
  onSelectPageLink: OnSelectPageLink;
  pageLinkDropDown: any;
  setButton: any;
  constructor(editor: CanvasflowEditor, onSelectPageLink: OnSelectPageLink) {
    super(editor.locale);
    this.onSelectPageLink = onSelectPageLink;
    this.editor = editor;
    this.pageLinkSources = editor.config.get(
      "pageLinkSources",
    ) as Array<PageLinkSource>;
    console.log(`FROM THE VIEW`, this.pageLinkSources);
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.items.add(this.createLabel("Insert Page Link"));
    this.pageLinkDropDown = this.getPageDropdown();

    const collection: Collection<any> = this.pageLinkSources.reduce(
      reduceCollection,
      new Collection(),
    );
    addListToDropdown(this.pageLinkDropDown, collection);
    this.items.add(this.pageLinkDropDown);

    this.items.add(this.createLabel(""));
    this.setButton = this.createButton("Insert Link", ``, "button-blue");
    this.setButton.type = "submit";
    this.setButton.isEnabled = false;
    //this.items.add(this.setButton);
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-page"],
      },
      children: this.items,
    });
  }

  addChild = (element: any) => {
    // console.log("element in child", element);
    // console.log(`ITEMS`, this.items);
    // this.items.push(element);
    // this.registerChild([element]);
    this.items.add(element);
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-page"],
      },
      children: this.items,
    });
  };

  createAnchors(anchors: Array<PageLinkSource>, cb: any) {
    console.log("anchors: ", anchors);

    const anchorDropdown = createDropdown(this.editor.locale);
    anchorDropdown.on("execute", cb);

    anchorDropdown.buttonView.set({
      label: "Select Anchor",
      withText: true,
    });
    anchorDropdown.id = "dropdown-anchors";
    return anchorDropdown;
  }

  render() {
    super.render();
    submitHandler({
      view: this,
    });
    this.items._items.forEach((view: { element: Element }) => {
      this.focusTracker.add(view.element);
    });
  }

  destroy() {
    super.destroy();
    this.focusTracker.destroy();
  }

  getPageDropdown() {
    const listDropdown = createDropdown(this.editor.locale);
    listDropdown.on("execute", this.onSelectPageLink(this.editor));

    listDropdown.buttonView.set({
      label: "Select Page",
      withText: true,
    });
    listDropdown.id = "dropdown-element";
    return listDropdown;
  }

  createButton(label: any, icon: any, className: any) {
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

type OnSelectPageLink = (editor: CanvasflowEditor) => any;

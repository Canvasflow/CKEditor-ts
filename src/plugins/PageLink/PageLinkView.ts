import {
  View,
  ButtonView,
  submitHandler,
  LabelView,
  createDropdown,
  Model,
  addListToDropdown,
} from "@ckeditor/ckeditor5-ui";
import { FocusTracker, Collection, Locale } from "@ckeditor/ckeditor5-utils";
import { GetCallback, BaseEvent } from "@ckeditor/ckeditor5-utils/src/emittermixin";
import { PageLinkSource } from "../../BaseEditor";

/*
  1. Renderiza todos los pages
  2. Haz trigger del page que se seleciono 
  3. Renderiza los anchors
  4. Haz trigger del anchor se selecciono
  5. Inserta el link

  1. Renderiza todos los pages  - CHECK
  2. Haz trigger del page que se seleciono 
  3. Inserta el link
*/

export class PageLinkView extends View {
  private items: any;
  private focusTracker: FocusTracker;
  private pageLinkDropDown: any;
  private setButton: any;
  private viewer: PageLinkViewer;

  constructor(viewer: PageLinkViewer) {
    super(viewer.locale);
    this.viewer = viewer;
    this.focusTracker = new FocusTracker();
    this.initItems()
  }

  initItems() {
    this.items = this.createCollection();
    this.items.add(this.createLabel("Insert Page Link"));
    // this.createPages()
    //this.items.add(this.createLabel(""));
    this.createButton()

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
    this.setButton = this.createButtonObject("Insert Link", ``, "button-blue");
    this.setButton.type = "submit";
    this.setButton.isEnabled = false;
    //this.items.add(this.setButton);
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
    const listDropdown = createDropdown(this.locale);
    listDropdown.on("execute", this.viewer.onSelectPage)
    // listDropdown.on("execute", this.onSelectPageLink(this.editor));

    listDropdown.buttonView.set({
      label: "Select Page",
      withText: true,
    });
    listDropdown.id = "dropdown-element";
    return listDropdown;
  }


  selectPage(page: string) {
    this.pageLinkDropDown?.buttonView.set({
      label: page,
      withText: true,
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

  createAnchors(anchors: Array<PageLinkSource>) {
    //ELIMINAR LINEA SIGUIENTE DESPUES
    this.items.add(this.createLabel(""));
    //ELIMINAMOS ANCHORS ANTERIORES
    //this.items.remove()
    console.log(this.items.filter((value) => {
      if (value)
    }))

    const anchorDropdown = createDropdown(this.locale);
    anchorDropdown.on("execute", this.viewer.onSelectAnchor);

    anchorDropdown.buttonView.set({
      label: "Select Anchor",
      withText: true,
    });
    anchorDropdown.id = "dropdown-anchors";

    const collection: Collection<any> = anchors.reduce(
      reduceCollection,
      new Collection(),
    );
    addListToDropdown(anchorDropdown, collection);
    this.items.add(anchorDropdown);

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
  locale?: Locale
  onSelectPage: GetCallback<BaseEvent>
  onSelectAnchor: GetCallback<BaseEvent>
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


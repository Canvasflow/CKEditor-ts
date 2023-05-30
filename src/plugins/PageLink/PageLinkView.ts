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
import CanvasflowEditor, { PageLinkSource, AnchorFn } from '../../BaseCanvasflowEditor'

export class PageLinkView extends View {
  declare editor: CanvasflowEditor;
  pageLinkSources: Array<PageLinkSource> = [];
  columns: number | undefined;
  items: any;
  focusTracker: FocusTracker;

  constructor(editor: CanvasflowEditor) {
    super(editor.locale);
    this.editor = editor;
    this.pageLinkSources = editor.config.get('pageLinkSources') as Array<PageLinkSource>;
    console.log(`FROM THE VIEW`, this.pageLinkSources)
    this.focusTracker = new FocusTracker();
    this.items = this.createCollection();
    this.items.add(this.createLabel("Insert Page Link"));
    const listDropdown = this.getDropdown();

    const collection: Collection<any> = this.pageLinkSources.reduce(reduceCollection, new Collection());

    // working on adding the button actions
    addListToDropdown(listDropdown, collection);



    //AGREGAMOS PAGINAS?
    this.items.add(listDropdown);
    this.items.add(this.createLabel(""));
    let setButton = this.createButton("Insert Link", ``, "button-blue");

    this.items.add(setButton);
    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-page"],
      },
      children: this.items,
    });
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

  getDropdown() {
    const listDropdown = createDropdown(this.editor.locale);
    listDropdown.on('execute', this.onSelectPageLink)

    listDropdown.buttonView.set({
      label: "Select Page",
      withText: true,
    });
    listDropdown.id = "dropdown-element";
    return listDropdown
  }

  onSelectPageLink(evt: any) {
    const { source } = evt;
    const { data } = source;
    // TODO In Here you detect which page link was selected
    console.log(`This is the pageLink that was selected`, data);
    const { id } = data;
    const anchorFn: AnchorFn = this.editor.config.get('fetchAnchors') as AnchorFn;
    anchorFn(id)
      .then((anchors) => {
        console.log(anchors)
      })
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

function reduceCollection(acc: Collection<any>, pageLink: PageLinkSource, index: number) {
  const { title } = pageLink;
  const model = new Model({
    label: title,
    withText: true,
  });
  model.set('data', {
    pageLink,
    index
  })
  acc.add({
    type: "button",
    model,
  })
  return acc;
}
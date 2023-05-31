import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { ContextualBalloon, clickOutsideHandler } from "@ckeditor/ckeditor5-ui";
import { PageLinkView } from "./PageLinkView";
import check from "@ckeditor/ckeditor5-core/theme/icons/check.svg";
import CanvasflowEditor, { PageLinkSource } from "../../BaseEditor";

export class PageLinkUI extends Plugin {
  declare editor: CanvasflowEditor;
  balloon: any;
  formView?: PageLinkView;
  selectedPage?: String;
  selectedAnchor?: String;
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    this.balloon = this.editor.plugins.get(ContextualBalloon);
    this.formView = this.createFormView();

    const pageLinkSources: Array<PageLinkSource> = this.editor.config.get(
      "pageLinkSources",
    ) as Array<PageLinkSource>;
    if (!pageLinkSources.length) {
      return;
    }

    editor.ui.componentFactory.add("pageLink", () => {
      const button = new ButtonView();
      button.label = "Go to Page";
      button.tooltip = true;
      button.withText = false;
      button.icon = check;
      this.listenTo(button, "execute", () => {
        this.showUI();
      });
      return button;
    });
  }

  createFormView() {
    const editor = this.editor;
    const formView = new PageLinkView(editor, this.onSelectPageLink);
    this.formView = formView;
    this.listenTo(formView, "submit", () => {
      let url = `/article/${this.selectedPage}`;
      if (this.selectedAnchor) {
        url += `#${this.selectedAnchor}`;
      }
      editor.execute("PageLink", url);
      this.hideUI();
    });

    this.listenTo(formView, "execute", (_) => {
      console.log("called execute");
    });

    clickOutsideHandler({
      emitter: formView,
      activator: () => this.balloon.visibleView === formView,
      contextElements: [this.balloon.view.element],
      callback: () => this.hideUI(),
    });

    return formView;
  }

  onSelectPageLink = (editor: CanvasflowEditor) => {
    return (evt: any) => {
      console.log(`EVENT`, evt);
      const { source } = evt;
      const { data } = source;
      // console.log(`This is the pageLink that was selected`, data);
      // console.log("editor value in onSelectPageLink", editor);
      // TODO In Here you detect which page link was selected
      console.log("DATA IN UI: ", data);
      console.log(`LLEGUE AQUI`);
      this.selectedPage = data.pageLink.id;
      this.formView?.pageLinkDropDown?.buttonView.set({
        label: data.pageLink.title,
        withText: true,
      });

      if (!editor.anchorFn) {
        return;
      }
      editor.anchorFn(data.pageLink.id).then((anchors) => {
        //usar return
        if (anchors.length > 0) {
          this.formView?.addChild(this.formView.getDropdown());
        } else {
          this.formView?.setButton.set({ isEnabled: true });
        }
      });

      /*const { pageLink } = data;
      editor.execute("PageLink", pageLink.id);
      if (!editor.anchorFn) {
        return;
      }
      editor.anchorFn(pageLink.id).then((anchors) => {
        formView?.addChild(formView.getDropdown());
        // formView?.createAnchors(anchors, cb);
        /*console.log(anchors);

        balloon.remove(this.formView);
        this.init();
        this.showUI();
      });*/
    };
  };

  onSelectAnchorLink(evt: any) {
    console.log(`I click the anchor`, evt);
  }

  showUI() {
    this.balloon.add({
      view: this.formView,
      position: this.getBalloonPositionData(),
    });
  }

  hideUI() {
    if (this.balloon) this.balloon.remove(this.formView);
  }

  getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = () => {
      const firstRange = viewDocument.selection.getFirstRange();
      if (!firstRange) {
        return;
      }
      return view.domConverter.viewRangeToDom(firstRange);
    };
    return {
      target,
    };
  }
}

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export class PageLinkEditing extends Plugin {
  static get pluginName() {
    return "PageEditing";
  }

  constructor(editor: any) {
    super(editor);

    // editor.conversion.for("downcast").attributeToElement({
    //   model: FONT_COLOR,
    //   view: renderDowncastElement(defaultColors),
    // });

    // editor.commands.add(FONT_COLOR, new FontColorCommand(editor));
    // editor.model.schema.extend("$text", { allowAttributes: FONT_COLOR });
    // editor.model.schema.setAttributeProperties(FONT_COLOR, {
    //   isFormatting: true,
    //   copyOnEnter: true,
    // });
  }
}

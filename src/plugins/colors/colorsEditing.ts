import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export class ColorEditing extends Plugin {
  init() {
    this._defineSchema();
    this._defineConverters();
  }
  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.extend("$text", {
      allowAttributes: ["color-picker"],
    });
  }
  _defineConverters() {
    const conversion = this.editor.conversion;

    // conversion.for("downcast").attributeToElement({
    //   model: "color-picker",
    //   view: (modelAttributeValue, conversionApi) => {
    //     const { writer } = conversionApi;
    //     return writer.createAttributeElement("abbr", {
    //       title: modelAttributeValue,
    //     });
    //   },
    // });

    // // Conversion from a view element to a model attribute
    // conversion.for("upcast").elementToAttribute({
    //   view: {
    //     name: "abbr",
    //     attributes: ["title"],
    //   },
    //   model: {
    //     key: "abbreviation",

    //     // Callback function provides access to the view element
    //     value: (viewElement: any) => {
    //       const title = viewElement.getAttribute("title");
    //       return title;
    //     },
    //   },
    // });
  }
}

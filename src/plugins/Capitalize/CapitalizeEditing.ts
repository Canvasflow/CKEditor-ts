import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import CanvasflowEditor from "../../BaseEditor";
import {
  TextTransformCommand,
  TEXT_TRANSFORM_ATTR,
  TEXT_TRANSFORM_COMMAND,
} from "../../commands/TextTransform/TextTransformCommand";
import { uid } from "ckeditor5/src/utils";

export class CapitalizeEditing extends Plugin {
  static get pluginName() {
    return "CapitalizeEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: TEXT_TRANSFORM_ATTR,
      view: renderDowncastElement(),
    });

    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "span",
        styles: {
          "text-transform": /[\s\S]+/,
        },
      },
      model: {
        key: "text-transform",
        value: (viewElement: any, conversionApi: any) => {
          const type = viewElement.getStyle("text-transform");
          if (type) {
            return type;
          }

          return null;
        },
      },
    });

    editor.commands.add(
      TEXT_TRANSFORM_COMMAND,
      new TextTransformCommand(editor),
    );
    editor.model.schema.extend("$text", {
      allowAttributes: TEXT_TRANSFORM_ATTR,
    });
    editor.model.schema.setAttributeProperties(TEXT_TRANSFORM_ATTR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}

function renderDowncastElement() {
  return (modelAttributeValue: string, viewWriter: any) => {
    const attributes = {
      style: `text-transform:${modelAttributeValue};`,
    };
    return viewWriter.writer.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

function ToAttribute(viewElementOrGlossary: any, data: any) {
  const textNode = viewElementOrGlossary.getChild(0);
  if (!textNode) {
    return;
  }
  return AddPluginAttributes({}, data);
}

function AddPluginAttributes(baseGlossaryData: any, data: any) {
  return Object.assign({ uid: uid() }, baseGlossaryData, data || {});
}

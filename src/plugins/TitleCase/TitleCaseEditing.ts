import { uid } from "ckeditor5/src/utils";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import CanvasflowEditor from "../../BaseEditor";
import {
  TextTransformCommand,
  TEXT_TRANSFORM_ATTR,
  TEXT_TRANSFORM_COMMAND,
} from "../../commands/TextTransform/TextTransformCommand";
export class TitleCaseEditing extends Plugin {
  static get pluginName() {
    return "TitleCaseEditing";
  }

  constructor(editor: CanvasflowEditor) {
    super(editor);
    editor.conversion.for("downcast").attributeToElement({
      model: TEXT_TRANSFORM_ATTR,
      view: renderDowncastElement(),
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

    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "strong",
      },
      model: {
        key: "bold",
        value: (viewItem: any) => {
          const attributes = ToAttribute(viewItem, {
            style: viewItem.getAttribute("style"),
          });

          return attributes;
        },
      },
      converterPriority: "high",
    });

    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "b",
      },
      model: {
        key: "bold",
        value: (viewItem: any) => {
          const attributes = ToAttribute(viewItem, {
            style: viewItem.getAttribute("style"),
          });

          return attributes;
        },
      },
      converterPriority: "high",
    });

    editor.conversion.for("downcast").attributeToElement({
      model: "bold",
      view: (modelAttributeValue, { writer }) => {
        if (modelAttributeValue && modelAttributeValue.style) {
          const attributes = { style: modelAttributeValue.style };

          return writer.createAttributeElement("strong", attributes);
        }

        if (!modelAttributeValue) {
          return;
        }
      },
      converterPriority: "high",
    });

    editor.conversion.for("upcast").elementToAttribute({
      view: {
        name: "em",
      },
      model: {
        key: "italic",
        value: (viewItem: any) => {
          const attributes = ToAttribute(viewItem, {
            style: viewItem.getAttribute("style"),
          });

          return attributes;
        },
      },
      converterPriority: "high",
    });

    editor.conversion.for("downcast").attributeToElement({
      model: "italic",
      view: (modelAttributeValue, { writer }) => {
        if (modelAttributeValue && modelAttributeValue.style) {
          const attributes = { style: modelAttributeValue.style };

          return writer.createAttributeElement("em", attributes);
        }

        if (!modelAttributeValue) {
          return;
        }
      },
      converterPriority: "high",
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

function AddPluginAttributes(baseGlossaryData: any, data: any) {
  return Object.assign({ uid: uid() }, baseGlossaryData, data || {});
}

function ToAttribute(viewElementOrGlossary: any, data: any) {
  const textNode = viewElementOrGlossary.getChild(0);
  if (!textNode) {
    return;
  }

  return AddPluginAttributes({}, data);
}

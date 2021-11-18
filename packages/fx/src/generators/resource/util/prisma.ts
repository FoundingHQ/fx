import { Property, Value } from "@mrleebo/prisma-ast";

// @id @default(cuid())
export const cuidFunc: Value = {
  type: "function",
  name: "cuid",
  params: [],
};

// @default(now())
export const nowFunc: Value = {
  type: "function",
  name: "now",
  params: [],
};

export const primaryKey: Property = {
  type: "field",
  name: "id",
  fieldType: "String",
  array: false,
  optional: false,
  attributes: [
    {
      type: "attribute",
      name: "id",
      kind: "field",
      group: "",
    },
    {
      type: "attribute",
      name: "default",
      kind: "field",
      group: "",
      args: [
        {
          type: "attributeArgument",
          value: cuidFunc,
        },
      ],
    },
  ],
};

export const createdAt: Property = {
  type: "field",
  name: "createdAt",
  fieldType: "DateTime",
  array: false,
  optional: false,
  attributes: [
    {
      type: "attribute",
      name: "default",
      kind: "field",
      group: "",
      args: [
        {
          type: "attributeArgument",
          value: nowFunc,
        },
      ],
    },
  ],
};

export const updatedAt: Property = {
  type: "field",
  name: "updatedAt",
  fieldType: "DateTime",
  array: false,
  optional: false,
  attributes: [
    // @updatedAt
    {
      type: "attribute",
      name: "updatedAt",
      kind: "field",
      group: "",
    },
  ],
};

export const attributesToProperties = (attributes: string) => {
  const properties: Array<Property> = Object.keys(attributes).map(
    (attribute: string) => {
      const [fieldName, fieldType] = attribute.split(":");
      return { type: "field", name: fieldName, fieldType };
    }
  );

  return properties;
};

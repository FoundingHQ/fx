export default {
  type: "model",
  name: "Customer",
  properties: [
    {
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
        },
        {
          type: "attribute",
          name: "default",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "function",
                name: "cuid",
              },
            },
          ],
        },
      ],
    },
    {
      type: "field",
      name: "user",
      fieldType: "User",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "relation",
          kind: "field",
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "keyValue",
                key: "fields",
                value: {
                  type: "array",
                  args: ["userId"],
                },
              },
            },
            {
              type: "attributeArgument",
              value: {
                type: "keyValue",
                key: "references",
                value: {
                  type: "array",
                  args: ["id"],
                },
              },
            },
            {
              type: "attributeArgument",
              value: {
                type: "keyValue",
                key: "onDelete",
                value: "Cascade",
              },
            },
          ],
        },
      ],
    },
    {
      type: "field",
      name: "userId",
      fieldType: "String",
      array: false,
      optional: false,
    },
    {
      type: "field",
      name: "stripeCustomerId",
      fieldType: "String",
      array: false,
      optional: false,
    },
    {
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
          args: [
            {
              type: "attributeArgument",
              value: {
                type: "function",
                name: "now",
              },
            },
          ],
        },
      ],
    },
    {
      type: "field",
      name: "updatedAt",
      fieldType: "DateTime",
      array: false,
      optional: false,
      attributes: [
        {
          type: "attribute",
          name: "updatedAt",
          kind: "field",
        },
      ],
    },
  ],
};

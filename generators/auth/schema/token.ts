export default {
  type: "model",
  name: "Token",
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
      name: "hashedToken",
      fieldType: "String",
      array: false,
      optional: false,
    },
    {
      type: "field",
      name: "type",
      fieldType: "TokenType",
      array: false,
      optional: false,
    },
    {
      type: "field",
      name: "expiresAt",
      fieldType: "DateTime",
      array: false,
      optional: true,
    },
    {
      type: "field",
      name: "sentTo",
      fieldType: "String",
      array: false,
      optional: true,
    },
    {
      type: "break",
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
      type: "break",
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
    {
      type: "break",
    },
    {
      type: "attribute",
      name: "unique",
      kind: "model",
      args: [
        {
          type: "attributeArgument",
          value: {
            type: "array",
            args: ["hashedToken", "type"],
          },
        },
      ],
    },
  ],
};

export default {
  type: "model",
  name: "Account",
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
      name: "provider",
      fieldType: "String",
      array: false,
      optional: false,
    },
    {
      type: "field",
      name: "providerAccountId",
      fieldType: "String",
      array: false,
      optional: false,
    },
    {
      type: "field",
      name: "refreshToken",
      fieldType: "String",
      array: false,
      optional: true,
    },
    {
      type: "field",
      name: "accessToken",
      fieldType: "String",
      array: false,
      optional: true,
    },
    {
      type: "field",
      name: "expiresAt",
      fieldType: "Int",
      array: false,
      optional: true,
    },
    {
      type: "break",
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
            args: ["provider", "providerAccountId"],
          },
        },
      ],
    },
  ],
};

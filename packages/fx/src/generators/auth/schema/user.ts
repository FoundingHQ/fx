export default {
  type: "model",
  name: "User",
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
      name: "email",
      fieldType: "String",
      array: false,
      optional: true,
      attributes: [
        {
          type: "attribute",
          name: "unique",
          kind: "field",
        },
      ],
    },
    {
      type: "field",
      name: "emailVerified",
      fieldType: "DateTime",
      array: false,
      optional: true,
    },
    {
      type: "field",
      name: "name",
      fieldType: "String",
      array: false,
      optional: true,
    },
    {
      type: "field",
      name: "image",
      fieldType: "String",
      array: false,
      optional: true,
    },
    {
      type: "break",
    },
    {
      type: "field",
      name: "accounts",
      fieldType: "Account",
      array: true,
      optional: false,
    },
    {
      type: "field",
      name: "passwordHash",
      fieldType: "String",
      array: false,
      optional: true,
    },
    {
      type: "break",
    },
    {
      type: "field",
      name: "role",
      fieldType: "UserRole",
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
              value: "USER",
            },
          ],
        },
      ],
    },
    {
      type: "field",
      name: "tokens",
      fieldType: "Token",
      array: true,
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
  ],
};

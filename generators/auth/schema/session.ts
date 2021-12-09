export default {
  type: "model",
  name: "Session",
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
      ],
    },
    {
      type: "field",
      name: "sid",
      fieldType: "String",
      array: false,
      optional: false,
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
      name: "data",
      fieldType: "String",
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
  ],
};

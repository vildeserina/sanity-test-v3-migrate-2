export const tableRow = {
  title: "Table Row",
  name: "tableRow",
  type: "object",
  fields: [
    {
      name: "cells",
      type: "array",
      of: [
        {
          name: "cell",
          type: "object",
          fields: [
            { name: "value", type: "string" },
            { name: "suffix", type: "string" },
            { name: "prefix", type: "string" },
            { name: "type", type: "string" },
            {
              name: "calculation",
              type: "object",
              fields: [
                {
                  name: "toBeSummed",
                  type: "boolean",
                },
                {
                  name: "title",
                  type: "string",
                  initialValue: "Totalt",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const socialConfig = {
  name: "socialConfig",
  type: "document",
  title: "Sosiale medier",
  fields: [
    {
      title: "Sosiale medier",
      name: "socialLinks",
      type: "array",
      of: [
        {
          title: "Lenke",
          type: "object",
          name: "socialLink",
          fields: [
            {
              title: "Title",
              name: "title",
              type: "string",
            },
            {
              title: "URL",
              name: "url",
              type: "url",
            },
          ],
        },
      ],
    },
  ],
}

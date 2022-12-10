export const contactInfo = {
  name: "contactInfo",
  type: "document",
  title: "Kontakt",
  fieldsets: [{ title: "Hoved", name: "central" }],
  fields: [
    {
      name: "email",
      type: "email",
      title: "E-post",
      fieldset: "central",
    },
    {
      name: "phone",
      type: "string",
      title: "Telefonnummer",
      fieldset: "central",
    },
    {
      name: "address",
      type: "string",
      title: "Addresse",
      fieldset: "central",
    },
    {
      name: "orgNumber",
      type: "string",
      title: "Org. nummer",
    },
    {
      title: "Avdelinger",
      name: "departments",
      type: "array",
      of: [
        {
          title: "Avdeling",
          type: "reference",
          name: "department",
          to: [{ type: "department" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      email: "email",
    },
    prepare({ email }) {
      return {
        title: "Contact",
        subtitle: email,
      }
    },
  },
}

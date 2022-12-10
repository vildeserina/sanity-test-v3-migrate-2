export const department = {
  title: "Department",
  name: "department",
  type: "document",
  fields: [
    {
      name: "office",
      type: "string",
      title: "Navn på sted / kontor",
    },
    {
      name: "email",
      type: "email",
      title: "E-post",
    },
    {
      name: "phone",
      type: "string",
      title: "Telefon",
    },
    {
      name: "address",
      type: "string",
      title: "Addresse",
    },
    {
      title: "Google Maps link",
      name: "googleMapsLink",
      type: "url",
    },
    {
      title: "Prioritering",
      name: "priority",
      description:
        "Avdelingen med høyest tall her får vist frem sine ansatte først på team-siden",
      type: "number",
    },
  ],
  preview: {
    select: {
      title: "office",
      subtitle: "address",
    },
  },
}

import { nanoid } from "nanoid"
import { FileText } from "phosphor-react"

import generateCreateTemplate from "../utils/generate-create-template.utils.schema"
import { EMOJIS } from "./proposal-status.schema"
import {
  proposalGroups,
  proposalTemplate,
} from "./templates/proposal.template.schema"

const [internalDescription, internalTitle, categories, tags, ...contentFields] =
  proposalTemplate.fields

export const proposal = {
  name: "proposal",
  title: "Tilbud",
  type: "document",
  groups: [
    { title: "ℹ️ Internt", name: "internal" },
    { title: "Grunnleggende", name: "basic", default: true },
    ...proposalGroups,
  ],
  icon: FileText,
  readOnly: ({ document }) => {
    return document?.isAccepted?.current ?? false
  },
  initialValue: () => ({
    status: {
      _type: "reference",
      _ref: "8e7b7cc3-c475-4720-a8c9-67d525ae3b27",
    },
    publishDate: new Date().toISOString(),
    slug: { current: nanoid() },
  }),
  fieldsets: [{ name: "statusFields", title: "Status" }],
  fields: [
    ...contentFields,
    {
      title: "Kunde",
      name: "customer",
      type: "reference",
      to: [{ type: "customer" }],
      group: "basic",
    },
    {
      title: "Avdeling",
      type: "reference",
      name: "department",
      to: [{ type: "department" }],
    },
    {
      title: "Nåværende",
      name: "status",
      type: "reference",
      to: [{ type: "proposalStatus" }],
      group: "basic",
      fieldset: "statusFields",
    },
    {
      title: "Vis status i tilbud",
      name: "showStatus",
      type: "boolean",
      initialValue: true,
      group: "basic",
      fieldset: "statusFields",
    },
    {
      title: "Publiseringsdato",
      name: "publishDate",
      type: "datetime",
      group: "basic",
      fieldset: "statusFields",
    },
    {
      title: "Vis publiseringsdato i tilbud",
      name: "showPublishDate",
      type: "boolean",
      initialValue: true,
      group: "basic",
      fieldset: "statusFields",
    },
    {
      title: "Arrangementdato",
      name: "eventDate",
      type: "datetime",
      group: "basic",
      fieldset: "statusFields",
    },
    {
      title: "Versjon",
      name: "version",
      type: "object",
      fieldset: "statusFields",
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          title: "Versjonsnummer",
          type: "number",
          name: "version",
          initialValue: 1,
        },
        {
          title: "Vis i tilbud",
          type: "boolean",
          name: "showInProposal",
          initialValue: true,
        },
        // generateCreateTemplate({
        //   title: "Lagre kopi av tilbud",
        //   templateType: "proposal",
        //   sourceType: "document",
        // }),
      ],
      group: "basic",
    },

    {
      title: "Godkjent av kunde",
      name: "isAccepted",
      type: "object",
      group: "accept",
      // inputComponent: IsProposalAccepted,
      fields: [
        {
          name: "current",
          title: "Godkjenn tilbud",
          type: "boolean",
        },
        {
          name: "date",
          title: "Dato tilbudet ble godkjent",
          type: "datetime",
        },
      ],
    },
    generateCreateTemplate({
      title: "Lagre tilbud som ny mal",
      templateType: "proposalTemplate",
      sourceType: "document",
      group: "templateGroup",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "media",
      statusIcon: "status.icon",
      statusTitle: "status.title",
      isPublished: "status.isPublished",
      customer: "customer.title",
      version: "version.version",
      isAccepted: "isAccepted.current",
    },
    prepare({
      title,
      media,
      statusIcon,
      statusTitle,
      isPublished,
      customer,
      version,
      isAccepted,
    }) {
      const mediaType = media && media?.type ? media?.type : null

      const image =
        mediaType == "gradient"
          ? media?.gradient?.image
          : mediaType == "image"
          ? media?.image
          : null

      const versionString = version ? `(v. ${version})` : ""
      return {
        title: !title
          ? "Utkast"
          : customer && title
          ? `${title} – ${customer} ${versionString}`
          : `${title} ${versionString}`,
        subtitle: isAccepted
          ? "✅ Godkjent og låst"
          : !!statusIcon && !!statusTitle
          ? `${EMOJIS[statusIcon]} ${statusTitle} ${versionString} ${
              !isPublished ? "(🫥 Skjult)" : ""
            }`
          : "Utkast",
        media: image ?? null,
      }
    },
  },
}

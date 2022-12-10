import { ArrowUDownRight } from "phosphor-react"

import ProposalPreviewComponent from "../../utils/proposal-preview.utils"

// 📃 SECTION
export const proposalShortcutSection = {
  name: "proposalShortcutSection",
  title: "Snarvei",
  type: "object",
  icon: ArrowUDownRight,
  fields: [
    { title: "Tittel", name: "title", type: "string" },
    {
      title: "Vis delelinje",
      name: "showDivider",
      type: "boolean",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      showDivider: "showDivider",
    },
    prepare({ title, showDivider }) {
      return {
        section: "Snarvei",
        title: title ?? "Snarvei",
        // layout: `${showDivider ? "✅" : "⬜️"} delelinje`,
        layout: showDivider ? "Med delelinje" : undefined,
      }
    },
    components: { preview: ProposalPreviewComponent },
  },
}

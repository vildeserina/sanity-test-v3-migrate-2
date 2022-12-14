import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list"
import React from "react"

export const EMOJIS = {
  draft: "đ",
  readyToSend: "đ¤",
  sent: "đ",
  check: "â",
  lost: "âŦī¸",
  inactive: "âš",
  info: "âšī¸",
  ok: "đ",
  warning: "â ī¸",
  cross: "â",
  question: "â",
  thumbsUp: "đ",
  thumbsDown: "đ",
  down: "âŦī¸",
  waiting: "âŗ",
  ready: "âē",
  star: "*ī¸âŖ",
  pause: "â¸",
  won: "đ",
  medal: "đĨ",
  party: "đ",
}

export const proposalStatus = {
  name: "proposalStatus",
  title: "Status",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "proposalStatus" }),
    {
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Ikon",
      name: "icon",
      type: "string",
      options: {
        list: [
          { title: EMOJIS["draft"], value: "draft" },
          { title: EMOJIS["star"], value: "star" },
          { title: EMOJIS["ready"], value: "ready" },
          { title: EMOJIS["readyToSend"], value: "readyToSend" },
          { title: EMOJIS["sent"], value: "sent" },
          { title: EMOJIS["check"], value: "check" },
          { title: EMOJIS["lost"], value: "lost" },
          { title: EMOJIS["inactive"], value: "inactive" },
          { title: EMOJIS["info"], value: "info" },
          { title: EMOJIS["ok"], value: "ok" },
          { title: EMOJIS["won"], value: "won" },
          { title: EMOJIS["warning"], value: "warning" },
          { title: EMOJIS["cross"], value: "cross" },
          { title: EMOJIS["question"], value: "question" },
          { title: EMOJIS["thumbsDown"], value: "thumbsDown" },
          { title: EMOJIS["thumbsUp"], value: "thumbsUp" },
          { title: EMOJIS["down"], value: "down" },
          { title: EMOJIS["waiting"], value: "waiting" },
          { title: EMOJIS["pause"], value: "pause" },
          { title: EMOJIS["medal"], value: "medal" },
          { title: EMOJIS["party"], value: "party" },
        ],
      },
      initialValue: "info",
    },
    {
      title: "Utkastmodus",
      description: "Vis advarsel om at tilbudet er i utkastmodus",
      name: "isDraft",
      type: "boolean",
      initialValue: true,
    },
    {
      title: "Publiseringsstatus",
      description: "Tilbudet skal vÃĻre publisert og tilgjengelig via lenke",
      name: "isPublished",
      type: "boolean",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      icon: "icon",
      isPublished: "isPublished",
      isDraft: "isDraft",
    },
    prepare({ title, icon = "draft", isPublished }) {
      return {
        title: title,
        subtitle: isPublished ? "đ Tilgjengelig via lenke" : "Skjult",
        media: (
          <span style={{ fontSize: "1.5rem" }}>
            {icon ? EMOJIS[icon] : "âšī¸"}
          </span>
        ),
      }
    },
  },
}

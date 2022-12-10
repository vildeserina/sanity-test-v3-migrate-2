/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { colorInput } from "@sanity/color-input"
import { visionTool } from "@sanity/vision"
import { apiVersion, dataset, previewSecretId, projectId } from "lib/sanity.api"
import { CopyProposal } from "lib/utils/proposal/copy-proposal.utils"
import { deskStructure } from "plugins/deskStructure"
import { sanityTemplates } from "plugins/templates/sanity-templates"
// import { previewDocumentNode } from "plugins/previewPane"
// import { productionUrl } from "plugins/productionUrl"
// import { settingsPlugin, settingsStructure } from "plugins/settings"
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash"
import { media } from "sanity-plugin-media"
import { muxInput } from "sanity-plugin-mux-input"
import { schemaTypes } from "schemas/schema"

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Test"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title,
  document: {
    actions: (prev, context) => {
      return {
        ...prev,
        CopyProposal,
      }
    },
  },
  schema: {
    templates: (prev, context) => sanityTemplates(prev, context),
    types: [
      ...schemaTypes,
      {
        type: "document",
        name: "hello",
        title: "Hello",
        fields: [{ title: "Title", name: "title", type: "string" }],
      },
    ],
  },
  form: {
    renderInput: (props, next) => {
      console.log(props)
      return next(props)
    },
  },
  plugins: [
    deskTool({
      structure: (S, context) => deskStructure(S, context),
    }),

    // deskTool({
    //   // structure: settingsStructure(settingsType),
    //   // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
    //   defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    // }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    // settingsPlugin({ type: settingsType.name }),
    // Add the "Open preview" action
    // productionUrl({
    //   apiVersion,
    //   previewSecretId,
    //   types: [postType.name, settingsType.name],
    // }),

    unsplashImageAsset(),
    media(),
    muxInput(),
    visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
  ],
})

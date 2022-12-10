// Then import schema types from any plugins that might expose them

// We import object and document schemas

import { contactInfo } from "./documents/contact-info.schema"
import { ctaSettings } from "./documents/cta.settings.schema"
import { ctaTemplate } from "./documents/cta.template.schema"
import { page } from "./documents/page.schema"
import { seoSettings } from "./documents/seo.settings.schema"
import { siteSettings } from "./documents/site.settings.schema"
import { button } from "./objects/button.schema"
import { externalLinkObject } from "./objects/external-link-object.schema"
// Object types
import { figure } from "./objects/figure.schema"
import { flexibleImage } from "./objects/flexible-image.schema"
import { internalLinkObject } from "./objects/internal-link-object.schema"
import { portableText } from "./objects/portable-text.schema"
import { seo } from "./objects/seo.schema"
import { simplePortableText } from "./objects/simple-portable-text.schema"
import { textSection } from "./sections/text.section.schema"
import { videoSection } from "./sections/video.section.schema"
import { externalLink } from "./utils/external-link.schema"
import { internalLink } from "./utils/internal-link.utils.schema"

const archives = generateArchivePages(archiveTypes)

// Brand
import { brandGuideline } from "./brand/brand-guideline.schema"
import { brandSettings } from "./brand/brand-settings.schema"
import { brandButton } from "./brand/sections/brand-button.schema"
import { brandColor } from "./brand/sections/brand-color.schema"
import { brandComparison } from "./brand/sections/brand-comparion.schema"
import { brandContent } from "./brand/sections/brand-content.schema"
import { brandDownload } from "./brand/sections/brand-downloads.schema"
import { brandGallery } from "./brand/sections/brand-gallery.schema"
import { brandShoutout } from "./brand/sections/brand-shoutout.schema"
import { brandVariant } from "./brand/sections/brand-variant.schema"
import { brandBuilder } from "./brand/utils/brand-builder.schema"
import { brandImage } from "./brand/utils/brand-image.schema"
import { simpleText } from "./brand/utils/simple-text.schema"
import { article } from "./documents/article.schema"
import { caseStudy } from "./documents/case-study.schema"
import { caseStudyTemplate } from "./documents/case-study.template.schema"
import { category } from "./documents/category.schema"
import { department } from "./documents/department.schema"
import { eventCategory } from "./documents/event-category.schema"
import { gradient } from "./documents/gradient.schema"
import { landingPage } from "./documents/landing-page.schema"
import { person } from "./documents/person.schema"
import { personCategory } from "./documents/person-category.schema"
import { quote } from "./documents/quote.schema"
import { service } from "./documents/service.schema"
import { serviceTemplate } from "./documents/service.template.schema"
import { socialConfig } from "./documents/social-config.schema"
import { accordion } from "./objects/accordion.schema"
import { hero } from "./objects/hero.schema"
import { infoBox } from "./objects/info-box.schema"
import { personPreview } from "./objects/person-preview.schema"
import { personRef } from "./objects/person-ref.schema"
import { sections } from "./objects/sections.schema"
import { twoColumnList } from "./objects/two-columns-list.schema"
import { customer } from "./proposal/documents/customer.schema"
// Proposal
import { proposal } from "./proposal/documents/proposal.schema"
import { proposalCategory } from "./proposal/documents/proposal-category.schema"
import { proposalSettings } from "./proposal/documents/proposal-settings.schema"
import { proposalStatus } from "./proposal/documents/proposal-status.schema"
import { proposalText } from "./proposal/documents/proposal-text.schema"
import { proposalTemplate } from "./proposal/documents/templates/proposal.template.schema"
import { proposalBlockSet } from "./proposal/sections/proposal.block.section.schema"
import {
  proposalCaseSection,
  proposalTemplateCase,
} from "./proposal/sections/proposal.case.section.schema"
import {
  proposalGallerySection,
  proposalTemplateGallery,
} from "./proposal/sections/proposal.gallery.section.schema"
import {
  proposalLogoSection,
  proposalTemplateLogos,
} from "./proposal/sections/proposal.logo.section.schema"
import { proposalShortcutSection } from "./proposal/sections/proposal.shortcut.section.schema"
import {
  proposalTableSection,
  proposalTemplateTable,
} from "./proposal/sections/proposal.table.section.schema"
// import {
//   proposalTemplateTestimonial,
//   proposalTestimonialSection,
// } from "./proposal/documents/sections/proposal.testimonial.schema"
// Proposal templates
import {
  proposalTemplateTerm,
  proposalTermSection,
} from "./proposal/sections/proposal.term.section.schema"
import {
  proposalTemplateTestimonial,
  proposalTestimonialSection,
} from "./proposal/sections/proposal.testimonial.section.schema"
import {
  proposalTemplateText,
  proposalTextSection,
} from "./proposal/sections/proposal.text.section.schema"
// Sections and utils
import { proposalMedia } from "./proposal/utils/proposal.media.schema"
import { proposalPortableText } from "./proposal/utils/proposal.portable-text.schema"
import { tableRow } from "./proposal/utils/proposal.table-row.schema"
import { articleSection } from "./sections/article.section.schema"
import { bannerSection } from "./sections/banner.section.schema"
import { cardSection } from "./sections/card.section.schema"
import { caseSection } from "./sections/case.section.schema"
import { gallerySection } from "./sections/gallery.section.schema"
import { quoteSection } from "./sections/quote.section.schema"
import { serviceSection } from "./sections/service.section.schema"
import { statsSection } from "./sections/stats.section.schema"
import { twoColSection } from "./sections/two-col.section.schema"
import {
  archiveTypes,
  generateArchivePages,
} from "./utils/generate-archive-pages.utils.schema"
import { media } from "./utils/media.schema"

// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [
  // The following are document types which will appear
  // in the studio.

  // Documents

  page,
  siteSettings,
  seoSettings,
  contactInfo,
  category,
  article,
  ctaSettings,
  ctaTemplate,
  person,
  quote,
  socialConfig,
  landingPage,
  service,
  caseStudy,
  caseStudyTemplate,
  eventCategory,
  gradient,
  personCategory,
  department,
  gallerySection,
  serviceTemplate,
  proposalTemplateCase,
  proposalCaseSection,

  // Objects
  simplePortableText,
  portableText,
  figure,
  flexibleImage,
  seo,
  hero,
  infoBox,
  sections,
  media,
  twoColumnList,
  accordion,

  personRef,

  // Archive docs
  ...archives,

  // Link utils
  button,
  internalLink,
  internalLinkObject,
  externalLink,
  externalLinkObject,

  // Sections
  textSection,
  videoSection,
  quoteSection,
  statsSection,
  twoColSection,
  caseSection,
  serviceSection,
  cardSection,
  bannerSection,
  articleSection,

  // Brand
  brandGuideline,
  brandSettings,
  simpleText,
  brandVariant,
  brandBuilder,
  brandColor,
  brandButton,
  brandContent,
  brandComparison,
  brandGallery,
  brandShoutout,
  brandImage,
  brandDownload,

  // Proposal utils
  proposalTableSection,
  tableRow,
  personPreview,

  // Proposal
  proposal,
  proposalTemplate,
  proposalPortableText,
  proposalText,
  proposalSettings,
  proposalMedia,

  proposalTemplateText,
  proposalTemplateGallery,
  proposalTemplateLogos,
  proposalTemplateTestimonial,

  proposalLogoSection,
  proposalTextSection,
  proposalGallerySection,
  proposalShortcutSection,
  proposalTestimonialSection,

  customer,
  proposalCategory,
  proposalBlockSet,

  proposalTemplateTable,
  proposalStatus,

  proposalTemplateTerm,
  proposalTermSection,
]

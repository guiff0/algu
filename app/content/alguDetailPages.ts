import { GOV_OPPORTUNITIES, GOV_PROFILE, NAICS_CODES, PAGES } from "./alguContent"
import type { ContentCard, ContentPage, ContentSection } from "./alguContent"

/**
 * One detail page per menu link, all rendered by the same screen/layout.
 * Pages are generated from existing content, so editing a service, industry,
 * technology, or opportunity in alguContent.ts updates its page automatically.
 */
type DetailItem = ContentCard & { sections?: ContentSection[] }
export type DetailGroup = { id: string; label: string; kicker: string; naics: string[]; items: DetailItem[] }

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

/** Route string understood by AlguScreenShell: "alguDetail:<group>-<slug>" */
export const detailKey = (group: string, title: string) => `${group}-${slugify(title)}`
export const detailRoute = (group: string, title: string) => `alguDetail:${detailKey(group, title)}`

const gov = PAGES.government.sections

export const DETAIL_GROUPS: DetailGroup[] = [
  { id: "government", label: "Government Opportunity Areas", kicker: "GOVERNMENT OPPORTUNITY AREA", naics: ["541511", "541512", "541519", "541715"], items: GOV_OPPORTUNITIES },
  { id: "services", label: "Quantum Services", kicker: "SERVICE", naics: ["541715", "541511", "541330", "541690"], items: PAGES.services.sections[0].items },
  { id: "products", label: "Products & Hardware", kicker: "PRODUCT", naics: ["541330", "541715", "518210"], items: PAGES.products.sections[0].items },
  { id: "industries", label: "Industries", kicker: "INDUSTRY", naics: ["541512", "541690", "541618"], items: PAGES.industries.sections[0].items },
  { id: "technologies", label: "Technologies", kicker: "TECHNOLOGY", naics: ["541715", "541511", "518210"], items: PAGES.technologies.sections.flatMap((s) => s.items) },
  {
    id: "contracting", label: "Government Contracting", kicker: "GOVERNMENT CONTRACTING", naics: [],
    items: [
      { title: "Contracting Profile", body: "Company data, state registration, and the compliance information government buyers screen first.", sections: [gov[0], gov[4]] },
      { title: "NAICS Codes", body: "The North American Industry Classification System codes under which ALGU Co. offers its technology services.", sections: [gov[2]] },
      { title: "Contract Pathways", body: "How ALGU pursues government work: prime contracts, teaming, R&D programs, schedules, and state and local procurement.", sections: [gov[3], gov[5]] },
    ],
  },
]

const firstSentence = (s: string) => s.split(/(?<=\.)\s/)[0]

function build(group: DetailGroup, item: DetailItem): ContentPage {
  const naics = NAICS_CODES.filter((n) => group.naics.includes(n.code))
  const siblings = group.items.filter((i) => i.title !== item.title).slice(0, 3)
  const sections: ContentSection[] = item.sections ?? [
    { heading: "Overview", layout: "list", items: [{ title: item.title, body: item.body }] },
    { heading: "How ALGU delivers", layout: "list", items: PAGES.services.sections[1].items },
    ...(naics.length ? [{ heading: "NAICS alignment", layout: "list" as const, items: naics.map((n) => ({ title: `${n.code} · ${n.title}`, body: n.note })) }] : []),
    ...(siblings.length ? [{ heading: `More in ${group.label}`, layout: "cards" as const, items: siblings.map((s) => ({ title: s.title, body: firstSentence(s.body) })) }] : []),
  ]
  return {
    key: detailKey(group.id, item.title),
    kicker: group.kicker,
    title: item.title,
    intro: firstSentence(item.body),
    cta: { label: `Request a briefing on ${item.title}`, url: `mailto:${GOV_PROFILE.email}?subject=${encodeURIComponent(`Capability briefing: ${item.title}`)}` },
    sections,
  }
}

export const DETAIL_PAGES: Record<string, ContentPage> = Object.fromEntries(
  DETAIL_GROUPS.flatMap((g) => g.items.map((i) => [detailKey(g.id, i.title), build(g, i)] as const)),
)

// Register with the shared page lookup used by the content screen.
Object.assign(PAGES, DETAIL_PAGES)

import { DETAIL_PAGES } from "../app/content/alguDetailPages"
import { GOV_OPPORTUNITIES, GOV_PROFILE, HOME_CONTENT, NAICS_CODES, PAGES } from "../app/content/alguContent"

describe("contractor-facing readiness content", () => {
  it("includes a public website and government contracting message", () => {
    const text = `${HOME_CONTENT.body} ${HOME_CONTENT.subBody}`.toLowerCase()
    expect(text).toContain("website")
    expect(text).toContain("capabilities statement")
    expect(text).toContain("government")
    expect(text).toContain("quantum")
    expect(text).toContain("ai")
  })

  it("makes the capabilities statement and company profile easy to find", () => {
    const intro = PAGES.about.intro.toLowerCase()
    expect(intro).toContain("capabilities statement")
    expect(intro).toContain("government")
    expect(PAGES.about.sections[0].items.some((item) => item.title.toLowerCase().includes("website"))).toBe(true)
  })

  it("publishes a government contracting page with opportunity areas and NAICS codes", () => {
    const gov = PAGES.government
    expect(gov.cta?.url).toBe(GOV_PROFILE.capabilitiesStatementUrl)
    expect(GOV_OPPORTUNITIES.length).toBeGreaterThanOrEqual(8)
    expect(NAICS_CODES.every((n) => /^\d{6}$/.test(n.code))).toBe(true)
    const titles = GOV_OPPORTUNITIES.map((o) => o.title.toLowerCase()).join(" ")
    expect(titles).toContain("post-quantum")
    expect(titles).toContain("cybersecurity")
    expect(titles).toContain("artificial intelligence")
  })

  it("never shows another company's contact details", () => {
    const all = JSON.stringify([HOME_CONTENT, PAGES, GOV_PROFILE]).toLowerCase()
    expect(all).not.toContain("mtechzilla")
  })

  it("generates at least 30 unique, complete detail pages", () => {
    const keys = Object.keys(DETAIL_PAGES)
    expect(keys.length).toBeGreaterThanOrEqual(30)
    expect(new Set(keys).size).toBe(keys.length)
    for (const p of Object.values(DETAIL_PAGES)) {
      expect(p.title.length).toBeGreaterThan(0)
      expect(p.sections.length).toBeGreaterThanOrEqual(1)
      expect(p.cta?.url).toContain("mailto:")
    }
  })
})

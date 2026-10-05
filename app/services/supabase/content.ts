import type { ContentPage } from "@/content/alguContent"
import { PAGES } from "@/content/alguContent"

import { isSupabaseConfigured, supabase } from "./client"

type SupabaseSiteContentRow = {
  page_key: string
  kicker?: string | null
  title?: string | null
  intro?: string | null
  sections?: unknown
}

export async function getPageContent(pageKey: string): Promise<ContentPage | undefined> {
  const fallback = PAGES[pageKey]
  if (!fallback) return undefined

  if (!isSupabaseConfigured) return fallback

  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("page_key, kicker, title, intro, sections")
      .eq("page_key", pageKey)
      .maybeSingle()

    if (error || !data) return fallback

    const parsed = data as SupabaseSiteContentRow
    const sections = Array.isArray(parsed.sections)
      ? parsed.sections
      : typeof parsed.sections === "string"
        ? JSON.parse(parsed.sections)
        : fallback.sections

    if (!Array.isArray(sections)) return fallback

    return {
      key: pageKey,
      kicker: parsed.kicker ?? fallback.kicker,
      title: parsed.title ?? fallback.title,
      intro: parsed.intro ?? fallback.intro,
      sections,
    }
  } catch {
    return fallback
  }
}

export async function upsertPageContent(page: ContentPage): Promise<boolean> {
  if (!isSupabaseConfigured) return false

  try {
    const { error } = await supabase.from("site_content").upsert(
      {
        page_key: page.key,
        kicker: page.kicker,
        title: page.title,
        intro: page.intro,
        sections: page.sections,
      },
      { onConflict: "page_key" },
    )

    return !error
  } catch {
    return false
  }
}

import { Platform } from "react-native"

import { isSupabaseConfigured, supabase } from "./client"

export type ContactInput = {
  name: string
  email: string
  organization: string
  phone: string
  topic: string
  message: string
}

export const isValidEmail = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.trim())

/** Saves a contact request to public.contact_submissions (see supabase/migrations). */
export async function submitContact(input: ContactInput): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isSupabaseConfigured) return { ok: false, error: "not_configured" }
  const { error } = await supabase.from("contact_submissions").insert({
    name: input.name.trim(),
    email: input.email.trim(),
    organization: input.organization.trim() || null,
    phone: input.phone.trim() || null,
    topic: input.topic,
    message: input.message.trim(),
    source: `app-${Platform.OS}`,
  })
  return error ? { ok: false, error: error.message } : { ok: true }
}

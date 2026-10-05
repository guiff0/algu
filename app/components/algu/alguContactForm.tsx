import { useState } from "react"
import { Linking, Pressable, TextInput, View } from "react-native"

import { Text } from "@/components/Text"
import { GOV_PROFILE } from "@/content/alguContent"
import { isValidEmail, submitContact } from "@/services/supabase/contact"
import { useAppTheme } from "@/theme/context"

const TOPICS = ["Government contracting", "Teaming / subcontracting", "Quantum services", "Products & hardware", "Other"]
const INK = "#1d1d1f"

export function AlguContactForm() {
  const { theme } = useAppTheme()
  const { spacing } = theme
  const [f, setF] = useState({ name: "", email: "", organization: "", phone: "", topic: TOPICS[0], message: "" })
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [note, setNote] = useState("")
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }))

  const send = async () => {
    if (!f.name.trim()) return (setState("error"), setNote("Please enter your name."))
    if (!isValidEmail(f.email)) return (setState("error"), setNote("Please enter a valid email address."))
    if (f.message.trim().length < 10) return (setState("error"), setNote("Please write at least 10 characters in your message."))
    setState("sending")
    const r = await submitContact(f)
    if (r.ok) return setState("sent")
    setState("error")
    setNote(`We could not save your message. Please email ${GOV_PROFILE.email} directly.`)
  }

  const input = { backgroundColor: "#fff", borderWidth: 1, borderColor: "#d4d4d4", borderRadius: 10, paddingVertical: 12, paddingHorizontal: 14, fontSize: 16, color: INK }
  const field = (label: string, key: keyof typeof f, extra: object = {}) => (
    <View style={{ marginBottom: spacing.sm }}>
      <Text text={label} style={{ color: "#3b4655", fontSize: 14, marginBottom: 4 }} />
      <TextInput value={f[key]} onChangeText={set(key)} style={[input, extra]} placeholderTextColor="#9a9a9a" accessibilityLabel={label} />
    </View>
  )

  return (
    <View style={{ backgroundColor: "#f8f8f7", borderRadius: 18, borderWidth: 1, borderColor: "#d9d7d5", padding: spacing.lg }}>
      <Text text="Send us a message" style={{ color: INK, fontSize: 22, fontWeight: "700", marginBottom: spacing.md }} />
      {state === "sent" ? (
        <Text text="Thank you. Your message was received and we will reply to the email you provided." style={{ color: INK, fontSize: 16, lineHeight: 24 }} />
      ) : (
        <>
          {field("Name *", "name")}
          {field("Email *", "email", {})}
          {field("Organization / agency", "organization")}
          {field("Phone", "phone")}
          <Text text="Topic" style={{ color: "#3b4655", fontSize: 14, marginBottom: 6 }} />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: spacing.sm }}>
            {TOPICS.map((t) => (
              <Pressable key={t} onPress={() => set("topic")(t)} accessibilityRole="button" accessibilityState={{ selected: f.topic === t }}
                style={{ borderRadius: 20, borderWidth: 1, borderColor: f.topic === t ? INK : "#d4d4d4", backgroundColor: f.topic === t ? INK : "#fff", paddingVertical: 8, paddingHorizontal: 14 }}>
                <Text text={t} style={{ color: f.topic === t ? "#fff" : INK, fontSize: 14 }} />
              </Pressable>
            ))}
          </View>
          {field("Message *", "message", { minHeight: 120, textAlignVertical: "top" })}
          {state === "error" ? <Text text={note} style={{ color: "#b3261e", fontSize: 14, marginBottom: spacing.sm }} /> : null}
          <Pressable onPress={send} disabled={state === "sending"} accessibilityRole="button"
            style={{ alignSelf: "flex-start", backgroundColor: "#1f56e0", borderRadius: 12, paddingVertical: 14, paddingHorizontal: 24, opacity: state === "sending" ? 0.6 : 1 }}>
            <Text text={state === "sending" ? "Sending..." : "Send message"} style={{ color: "#fff", fontSize: 16, fontWeight: "700" }} />
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`mailto:${GOV_PROFILE.email}`)} style={{ marginTop: spacing.sm }}>
            <Text text={`Or email ${GOV_PROFILE.email}`} style={{ color: "#3b4655", fontSize: 14, textDecorationLine: "underline" }} />
          </Pressable>
        </>
      )}
    </View>
  )
}

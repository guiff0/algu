import { FC } from "react"
import { Linking, Pressable, View, useWindowDimensions } from "react-native"

import { Text } from "@/components/Text"
import { AlguScreenShell } from "@/components/algu/alguScreenShell"
import { GOV_OPPORTUNITIES, GOV_PROFILE, HOME_CONTENT, NAICS_CODES, TRUST_SIGNALS } from "@/content/alguContent"
import type { alguStackScreenProps } from "@/navigators/alguNavigationTypes"
import { useAppTheme } from "@/theme/context"
import { useDocumentMeta } from "@/utils/useDocumentMeta"

interface AlguHomeScreenProps extends alguStackScreenProps<"alguHome"> {}

const INK = "#0d1721"
const BLUE = "#2f6fe8"

export const alguHomeScreen: FC<AlguHomeScreenProps> = function alguHomeScreen({ route, navigation }) {
  const { theme } = useAppTheme()
  const { spacing } = theme
  const { width } = useWindowDimensions()
  const isWide = width >= 920

  useDocumentMeta(
    "ALGU Co. | Quantum, AI & Cybersecurity Engineering for Government",
    "ALGU Co. delivers quantum, AI, cybersecurity, software, and hardware engineering to federal, state, and local government. View our contracting profile and capabilities statement.",
  )

  const goTo = (r: string) => navigation.navigate(r as never)
  const openCapabilities = () => Linking.openURL(GOV_PROFILE.capabilitiesStatementUrl)
  const openMail = () => Linking.openURL(`mailto:${HOME_CONTENT.contactEmail}`)

  const facts: { label: string; value: string }[] = [
    { label: "Legal name", value: `${GOV_PROFILE.legalName} (DBA ${GOV_PROFILE.dba})` },
    { label: "State registration", value: "North Carolina Business Corporation, No. 1617133" },
    ...(GOV_PROFILE.uei ? [{ label: "UEI", value: GOV_PROFILE.uei }] : []),
    ...(GOV_PROFILE.cageCode ? [{ label: "CAGE code", value: GOV_PROFILE.cageCode }] : []),
    { label: "Primary NAICS", value: NAICS_CODES.slice(0, 4).map((n) => n.code).join(", ") },
    { label: "Location", value: "Charlotte, North Carolina" },
    { label: "Contact", value: GOV_PROFILE.email },
  ]

  return (
    <AlguScreenShell currentRoute={route.name} onNavigate={goTo}>
      <View style={{ backgroundColor: "#dfe0df", paddingBottom: spacing.xxl }}>
        <View style={{ maxWidth: 1760, width: "100%", alignSelf: "center", paddingHorizontal: spacing.lg }}>
          {/* Hero */}
          <View
            style={{
              marginTop: spacing.lg,
              backgroundColor: "#efefed",
              borderRadius: 18,
              borderWidth: 1,
              borderColor: "#d7d5d2",
              flexDirection: isWide ? "row" : "column",
              overflow: "hidden",
            }}
          >
            <View style={{ flex: 1.3, padding: spacing.lg, justifyContent: "center" }}>
              <Text text={HOME_CONTENT.eyebrow} style={{ color: BLUE, fontSize: 12, letterSpacing: 2, fontWeight: "700" }} />
              <Text
                text={HOME_CONTENT.headline}
                style={{ color: INK, fontSize: isWide ? 48 : 34, lineHeight: isWide ? 54 : 40, fontWeight: "700", marginTop: spacing.sm }}
              />
              <Text text={HOME_CONTENT.body} style={{ color: "#3b4655", fontSize: 16, lineHeight: 26, marginTop: spacing.md }} />
              <Text text={HOME_CONTENT.subBody} style={{ color: "#3b4655", fontSize: 16, lineHeight: 26, marginTop: spacing.sm }} />

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.lg }}>
                <Pressable
                  onPress={openCapabilities}
                  accessibilityRole="link"
                  style={{ backgroundColor: BLUE, borderRadius: 12, paddingVertical: 15, paddingHorizontal: 22 }}
                >
                  <Text text="Download Capabilities Statement" style={{ color: "#fff", fontSize: 16, fontWeight: "700" }} />
                </Pressable>
                <Pressable
                  onPress={() => goTo("alguGovernment")}
                  accessibilityRole="button"
                  style={{ backgroundColor: "#f7f7f6", borderRadius: 12, borderWidth: 1, borderColor: "#c9c6c3", paddingVertical: 15, paddingHorizontal: 22 }}
                >
                  <Text text="View Contracting Profile" style={{ color: INK, fontSize: 16, fontWeight: "600" }} />
                </Pressable>
                <Pressable
                  onPress={openMail}
                  accessibilityRole="link"
                  style={{ borderRadius: 12, paddingVertical: 15, paddingHorizontal: 12 }}
                >
                  <Text text="Request a Capability Briefing →" style={{ color: INK, fontSize: 16, fontWeight: "600" }} />
                </Pressable>
              </View>
            </View>

            {/* Quick facts: the data contracting officers screen first */}
            <View style={{ flex: 1, padding: spacing.lg, backgroundColor: "#111720", justifyContent: "center" }}>
              <Text text="Vendor quick facts" style={{ color: "#f3f7fb", fontSize: 22, fontWeight: "700", marginBottom: spacing.md }} />
              {facts.map((f) => (
                <View key={f.label} style={{ marginBottom: spacing.sm }}>
                  <Text text={f.label} style={{ color: "#8fa3bd", fontSize: 12, letterSpacing: 1 }} />
                  <Text text={f.value} style={{ color: "#e6ecf4", fontSize: 15, lineHeight: 22 }} />
                </View>
              ))}
            </View>
          </View>

          {/* Contract opportunity areas */}
          <View style={{ marginTop: spacing.xl }}>
            <Text text="Where we compete in government technology" style={{ color: INK, fontSize: isWide ? 34 : 26, fontWeight: "700" }} />
            <Text
              text="The federal technology categories with the strongest current demand, matched to what ALGU delivers."
              style={{ color: "#3b4655", fontSize: 16, lineHeight: 26, marginTop: spacing.xs, marginBottom: spacing.md }}
            />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
              {GOV_OPPORTUNITIES.slice(0, 6).map((item) => (
                <Pressable
                  key={item.title}
                  onPress={() => goTo("alguGovernment")}
                  accessibilityRole="button"
                  style={{ width: isWide ? "32%" : "100%", flexGrow: 1, minWidth: 260, backgroundColor: "#111720", borderRadius: 16, borderWidth: 1, borderColor: "#2f3845", padding: spacing.lg }}
                >
                  <Text text={item.title} style={{ color: "#f3f7fb", fontSize: 20, lineHeight: 26, fontWeight: "700" }} />
                  <Text text={item.body} style={{ color: "#d1d8e2", fontSize: 14, lineHeight: 23, marginTop: spacing.sm }} />
                </Pressable>
              ))}
            </View>
            <Pressable onPress={() => goTo("alguGovernment")} accessibilityRole="button" style={{ alignSelf: "flex-start", marginTop: spacing.md }}>
              <Text text="See all 9 opportunity areas, NAICS codes, and contract pathways →" style={{ color: BLUE, fontSize: 16, fontWeight: "700" }} />
            </Pressable>
          </View>

          {/* Trust and compliance */}
          <View style={{ marginTop: spacing.xl }}>
            <Text text="Trust and compliance" style={{ color: INK, fontSize: isWide ? 34 : 26, fontWeight: "700", marginBottom: spacing.md }} />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
              {TRUST_SIGNALS.map((t) => (
                <View
                  key={t.title}
                  style={{ width: isWide ? "24%" : "100%", flexGrow: 1, minWidth: 230, backgroundColor: "#f5f4f2", borderRadius: 14, borderWidth: 1, borderColor: "#d6d4d1", padding: spacing.md }}
                >
                  <Text text={t.title} style={{ color: INK, fontSize: 17, fontWeight: "700", marginBottom: spacing.xs }} />
                  <Text text={t.body} style={{ color: "#3b4655", fontSize: 14, lineHeight: 22 }} />
                </View>
              ))}
            </View>
          </View>

          {/* Closing CTA */}
          <View style={{ marginTop: spacing.xl, backgroundColor: INK, borderRadius: 18, padding: spacing.lg, flexDirection: isWide ? "row" : "column", alignItems: isWide ? "center" : "flex-start", justifyContent: "space-between", gap: spacing.md }}>
            <Text text="Evaluating ALGU for a solicitation or teaming arrangement?" style={{ color: "#f3f7fb", fontSize: 24, lineHeight: 30, fontWeight: "700", flex: 1 }} />
            <Pressable onPress={openMail} accessibilityRole="link" style={{ backgroundColor: BLUE, borderRadius: 12, paddingVertical: 15, paddingHorizontal: 22 }}>
              <Text text={`Email ${GOV_PROFILE.email}`} style={{ color: "#fff", fontSize: 16, fontWeight: "700" }} />
            </Pressable>
          </View>
        </View>
      </View>
    </AlguScreenShell>
  )
}

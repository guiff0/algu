import { FC, useEffect, useState } from "react"
import { Linking, Pressable, View } from "react-native"

import { Text } from "@/components/Text"
import { AlguLogo } from "@/components/algu/alguLogo"
import { AlguDivider } from "@/components/algu/alguPrimitives"
import { AlguIllustration, type AlguIllustrationVariant } from "@/components/algu/alguIllustration"
import { AlguScreenShell } from "@/components/algu/alguScreenShell"
import { PAGES } from "@/content/alguContent"
import "@/content/alguDetailPages"
import { AlguContactForm } from "@/components/algu/alguContactForm"
import type { alguStackScreenProps } from "@/navigators/alguNavigationTypes"
import { getPageContent } from "@/services/supabase/content"
import { useAppTheme } from "@/theme/context"
import { useDocumentMeta } from "@/utils/useDocumentMeta"
import { algu } from "@/theme/alguPalette"

const PAGE_KEY_TO_ILLUSTRATION: Record<string, AlguIllustrationVariant> = {
  products: "products",
  services: "services",
  technologies: "technologies",
  industries: "industries",
  departments: "departments",
  about: "about",
  contact: "contact",
  government: "governance",
  leadership: "leadership",
  legal: "legal",
  governance: "governance",
  documentation: "documentation",
  "api-access": "api",
  whitepapers: "whitepapers",
  "case-studies": "caseStudies",
  newsroom: "newsroom",
  learn: "scientist",
  contracting: "governance",
}

interface AlguContentScreenProps extends alguStackScreenProps<
  | "alguProducts"
  | "alguServices"
  | "alguTechnologies"
  | "alguIndustries"
  | "alguDepartments"
  | "alguAbout"
  | "alguContact"
  | "alguGovernment"
  | "alguDetail"
  | "alguLeadership"
  | "alguLegal"
  | "alguGovernance"
  | "alguDocumentation"
  | "alguApiAccess"
  | "alguWhitepapers"
  | "alguCaseStudies"
  | "alguNewsroom"
  | "alguLearn"
> {}

export const alguContentScreen: FC<AlguContentScreenProps> = function alguContentScreen({
  route,
  navigation,
}) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const pageKey = (route.params as { pageKey: string } | undefined)?.pageKey ?? "products"
  const [page, setPage] = useState(PAGES[pageKey])

  useEffect(() => {
    let active = true
    setPage(PAGES[pageKey])

    getPageContent(pageKey).then((result) => {
      if (active && result) setPage(result)
    })

    return () => {
      active = false
    }
  }, [pageKey])

  useDocumentMeta(
    page ? `${page.title} | ALGU Co.` : "ALGU Co.",
    page ? page.intro.slice(0, 155) : undefined,
  )

  if (!page) return null

  return (
    <AlguScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
      <View style={{ backgroundColor: "#e9e7e4", paddingBottom: spacing.xxl }}>
        <View style={{ maxWidth: 1280, width: "100%", alignSelf: "center", paddingHorizontal: spacing.lg }}>
          <View
            style={{
              backgroundColor: "#f5f4f2",
              borderRadius: 18,
              borderWidth: 1,
              borderColor: "#d6d4d1",
              marginTop: spacing.lg,
              padding: spacing.lg,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md }}>
              <AlguLogo size={22} primaryText="ALGU" secondaryText="CO." />
              <Text
                text={page.kicker}
                style={{
                  fontFamily: typography.primary.medium,
                  color: algu.signal,
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.lg, marginTop: spacing.md }}>
              <View style={{ flex: 1 }}>
                <Text
                  text={page.title}
                  style={{
                    fontFamily: typography.primary.bold,
                    color: algu.text,
                    fontSize: 34,
                    lineHeight: 40,
                    marginBottom: spacing.sm,
                  }}
                />
                <Text
                  text={page.intro}
                  style={{ color: algu.textDim, fontSize: 15, lineHeight: 24 }}
                />
                {page.cta ? (
                  <Pressable
                    onPress={() => Linking.openURL(page.cta!.url)}
                    accessibilityRole="link"
                    accessibilityLabel={page.cta.label}
                    style={{
                      alignSelf: "flex-start",
                      marginTop: spacing.md,
                      backgroundColor: algu.signal,
                      borderRadius: 12,
                      paddingVertical: 14,
                      paddingHorizontal: 22,
                    }}
                  >
                    <Text text={page.cta.label} style={{ color: "#fff", fontSize: 16, fontWeight: "700" }} />
                  </Pressable>
                ) : null}
              </View>

              <View
                style={{
                  width: 180,
                  height: 180,
                  backgroundColor: "#edf2ff",
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#c7d7ff",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <AlguIllustration
                  variant={PAGE_KEY_TO_ILLUSTRATION[pageKey] ?? PAGE_KEY_TO_ILLUSTRATION[pageKey.split("-")[0]] ?? "products"}
                  height={120}
                  style={{ marginBottom: 0 }}
                />
              </View>
            </View>
          </View>

          <View style={{ marginTop: spacing.xl }}>
            {page.sections.map((section, i) => (
              <View key={section.heading} style={{ marginBottom: spacing.lg }}>
                {i > 0 ? <AlguDivider label={section.heading.toUpperCase()} spacing={spacing.lg} /> : null}
                <View
                  style={{
                    backgroundColor: i === 0 ? "#f8f8f7" : "#f3f3f1",
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: "#d9d7d5",
                    padding: spacing.lg,
                  }}
                >
                  <Text
                    text={section.heading}
                    style={{
                      fontFamily: typography.primary.bold,
                      color: algu.text,
                      fontSize: 22,
                      marginBottom: spacing.md,
                    }}
                  />

                  {section.layout === "cards" ? (
                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
                      {section.items.map((item) => (
                        <View
                          key={item.title}
                          style={{
                            width: "32%",
                            minWidth: 220,
                            flexGrow: 1,
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            borderColor: "#dfe1e5",
                            borderRadius: 14,
                            padding: spacing.md,
                          }}
                        >
                          <Text
                            text={item.title}
                            style={{
                              fontFamily: typography.primary.medium,
                              color: algu.text,
                              fontSize: 18,
                              marginBottom: spacing.sm,
                            }}
                          />
                          <Text text={item.body} style={{ color: algu.textDim, fontSize: 14, lineHeight: 22 }} />
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View style={{ gap: spacing.sm }}>
                      {section.items.map((item) => (
                        <View
                          key={item.title}
                          style={{
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            borderColor: "#e0e2e6",
                            borderRadius: 12,
                            paddingVertical: spacing.sm,
                            paddingHorizontal: spacing.md,
                          }}
                        >
                          <Text
                            text={item.title}
                            style={{
                              fontFamily: typography.primary.medium,
                              color: algu.text,
                              fontSize: 16,
                              marginBottom: 4,
                            }}
                          />
                          <Text text={item.body} style={{ color: algu.textDim, fontSize: 14, lineHeight: 22 }} />
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            ))}
            {pageKey === "contact" ? <AlguContactForm /> : null}
          </View>
        </View>
      </View>
    </AlguScreenShell>
  )
}

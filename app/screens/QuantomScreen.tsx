import { FC } from "react"
import { View } from "react-native"

import { Text } from "@/components/Text"
import {
  AlguCard,
  AlguDivider,
  AlguListRow,
  AlguSection,
} from "@/components/algu/alguPrimitives"
import { AlguIllustration, type AlguIllustrationVariant } from "@/components/algu/alguIllustration"
import { AlguScreenShell } from "@/components/algu/alguScreenShell"
import { PAGES } from "@/content/alguContent"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { algu } from "@/theme/alguPalette"

const PAGE_KEY_TO_ILLUSTRATION: Record<string, AlguIllustrationVariant> = {
  products: "products",
  services: "services",
  technologies: "technologies",
  industries: "industries",
  departments: "departments",
  about: "about",
  contact: "contact",
  leadership: "leadership",
  legal: "legal",
  governance: "governance",
  documentation: "documentation",
  "api-access": "api",
  whitepapers: "whitepapers",
  "case-studies": "caseStudies",
  newsroom: "newsroom",
}

interface QuantomScreenProps extends AppStackScreenProps<"Quantom"> {}

export const QuantomScreen: FC<QuantomScreenProps> = function QuantomScreen({
  route,
  navigation,
}) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const pageKey = (route.params as { pageKey: string } | undefined)?.pageKey ?? "products"
  const page = PAGES[pageKey]

  if (!page) return null

  return (
    <AlguScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl }}>
        <AlguIllustration
          variant={PAGE_KEY_TO_ILLUSTRATION[pageKey] ?? "products"}
          height={160}
          style={{ marginBottom: spacing.lg }}
        />
        <Text
          text={page.kicker}
          style={{
            fontFamily: typography.primary.medium,
            color: algu.signal,
            fontSize: 12,
            letterSpacing: 2,
            marginBottom: spacing.sm,
          }}
        />
        <Text
          text={page.title}
          style={{
            fontFamily: typography.primary.bold,
            color: algu.text,
            fontSize: 32,
            lineHeight: 38,
            marginBottom: spacing.md,
          }}
        />
        <Text
          text={page.intro}
          style={{ color: algu.textDim, fontSize: 15, lineHeight: 23, marginBottom: spacing.lg }}
        />
      </View>

      {page.sections.map((section, i) => (
        <View key={section.heading}>
          {i > 0 ? <AlguDivider label={section.heading.toUpperCase()} spacing={spacing.lg} /> : null}
          <AlguSection
            title={i === 0 ? section.heading : ""}
            spacing={spacing.lg}
            titleFontFamily={typography.primary.bold}
          >
            {section.layout === "cards" ? (
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
                {section.items.map((item) => (
                  <AlguCard
                    key={item.title}
                    title={item.title}
                    body={item.body}
                    accentColor={algu.teal}
                    spacing={spacing.md}
                    titleFontFamily={typography.primary.medium}
                  />
                ))}
              </View>
            ) : (
              section.items.map((item) => (
                <AlguListRow
                  key={item.title}
                  text={item.body ? `${item.title} — ${item.body}` : item.title}
                  dotColor={algu.signal}
                  spacing={spacing.sm}
                />
              ))
            )}
          </AlguSection>
        </View>
      ))}

      <View style={{ height: spacing.xxl }} />
    </AlguScreenShell>
  )
}

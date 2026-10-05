import { FC, useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

import { Text } from "@/components/Text"
import { AlguChip, AlguListRow, AlguPrimaryButton } from "@/components/algu/alguPrimitives"
import { AlguIllustration } from "@/components/algu/alguIllustration"
import { AlguScreenShell } from "@/components/algu/alguScreenShell"
import { BENEFITS, COMPANY_BLURB, COMPENSATION_PHILOSOPHY, FINE_PRINT, type Job } from "@/content/alguJobs"
import type { alguStackScreenProps } from "@/navigators/alguNavigationTypes"
import { getJob } from "@/services/watermelon/jobsSync"
import { useAppTheme } from "@/theme/context"
import { algu } from "@/theme/alguPalette"

interface AlguJobDetailScreenProps extends alguStackScreenProps<"alguJobDetail"> {}

function InfoRow({ label, value }: { label: string; value: string }) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  return (
    <View style={{ flexDirection: "row", marginBottom: spacing.xs }}>
      <Text
        text={label}
        style={{ fontFamily: typography.primary.medium, color: algu.steel, fontSize: 13, width: 150 }}
      />
      <Text text={value} style={{ color: algu.textDim, fontSize: 13, flex: 1 }} />
    </View>
  )
}

export const alguJobDetailScreen: FC<AlguJobDetailScreenProps> = function alguJobDetailScreen({
  route,
  navigation,
}) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { jobId } = route.params
  const [job, setJob] = useState<Job | null | undefined>(null)

  useEffect(() => {
    let mounted = true
    getJob(jobId).then((result) => {
      if (mounted) setJob(result ?? null)
    })
    return () => {
      mounted = false
    }
  }, [jobId])

  return (
    <AlguScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl }}>
        <AlguIllustration variant="careers" height={140} style={{ marginBottom: spacing.lg }} />

        {job === null ? (
          <ActivityIndicator color={algu.signal} />
        ) : job === undefined ? (
          <Text text="This role isn't available anymore." style={{ color: algu.textDim }} />
        ) : (
          <>
            {job.jobIdentification ? (
              <Text
                text={`JOB ID ${job.jobIdentification}`}
                style={{
                  fontFamily: typography.primary.medium,
                  color: algu.steel,
                  fontSize: 11,
                  letterSpacing: 1,
                  marginBottom: spacing.xs,
                }}
              />
            ) : null}
            <Text
              text={job.department.toUpperCase()}
              style={{
                fontFamily: typography.primary.medium,
                color: algu.signal,
                fontSize: 12,
                letterSpacing: 2,
                marginBottom: spacing.sm,
              }}
            />
            <Text
              text={job.title}
              style={{
                fontFamily: typography.primary.bold,
                color: algu.text,
                fontSize: 30,
                marginBottom: spacing.sm,
              }}
            />
            <View style={{ flexDirection: "row", gap: spacing.xs, flexWrap: "wrap", marginBottom: spacing.lg }}>
              <AlguChip label={job.field} fontFamily={typography.primary.medium} outline />
              <AlguChip label={job.location} fontFamily={typography.primary.medium} outline />
              <AlguChip label={job.employment_type} fontFamily={typography.primary.medium} outline />
            </View>

            <Text
              text={COMPANY_BLURB}
              style={{ color: algu.textDim, fontSize: 13.5, lineHeight: 20, marginBottom: spacing.lg }}
            />

            {/* Job Information block — only shown on richer listings that have these fields */}
            {job.fullAddress || job.basePaySalary ? (
              <View
                style={{
                  backgroundColor: algu.surface,
                  borderWidth: 1,
                  borderColor: algu.hairline,
                  borderRadius: 10,
                  padding: spacing.md,
                  marginBottom: spacing.lg,
                }}
              >
                <Text
                  text="Job Information"
                  style={{
                    fontFamily: typography.primary.medium,
                    color: algu.text,
                    fontSize: 14,
                    marginBottom: spacing.sm,
                  }}
                />
                <InfoRow label="Job Category" value={job.field} />
                <InfoRow label="Business Unit" value={job.department} />
                <InfoRow label="Posting Date" value={job.posted_at} />
                {job.fullAddress ? <InfoRow label="Location" value={job.fullAddress} /> : null}
                <InfoRow label="Job Schedule" value={job.employment_type} />
                {job.basePaySalary ? <InfoRow label="Base Pay/Salary" value={job.basePaySalary} /> : null}
              </View>
            ) : null}

            <Text
              text="Benefits"
              style={{
                fontFamily: typography.primary.medium,
                color: algu.text,
                fontSize: 16,
                marginBottom: spacing.sm,
              }}
            />
            {BENEFITS.map((b) => (
              <AlguListRow key={b} text={b} dotColor={algu.silverBright} spacing={spacing.xs} />
            ))}
            <View style={{ height: spacing.lg }} />

            <Text
              text="Job Description"
              style={{
                fontFamily: typography.primary.medium,
                color: algu.text,
                fontSize: 16,
                marginBottom: spacing.sm,
              }}
            />
            <Text
              text={job.description}
              style={{ color: algu.textDim, fontSize: 15, lineHeight: 23, marginBottom: spacing.lg }}
            />

            {job.responsibilities && job.responsibilities.length > 0 ? (
              <>
                <Text
                  text="Job responsibilities"
                  style={{
                    fontFamily: typography.primary.medium,
                    color: algu.text,
                    fontSize: 16,
                    marginBottom: spacing.sm,
                  }}
                />
                {job.responsibilities.map((r) => (
                  <AlguListRow key={r} text={r} dotColor={algu.signal} spacing={spacing.sm} />
                ))}
                <View style={{ height: spacing.md }} />
              </>
            ) : null}

            <Text
              text={job.responsibilities?.length ? "Required qualifications, capabilities, and skills" : "Requirements"}
              style={{
                fontFamily: typography.primary.medium,
                color: algu.text,
                fontSize: 16,
                marginBottom: spacing.sm,
              }}
            />
            {job.requirements.map((req) => (
              <AlguListRow key={req} text={req} dotColor={algu.signal} spacing={spacing.sm} />
            ))}

            {job.preferredQualifications && job.preferredQualifications.length > 0 ? (
              <>
                <View style={{ height: spacing.md }} />
                <Text
                  text="Preferred qualifications, capabilities, and skills"
                  style={{
                    fontFamily: typography.primary.medium,
                    color: algu.text,
                    fontSize: 16,
                    marginBottom: spacing.sm,
                  }}
                />
                {job.preferredQualifications.map((q) => (
                  <AlguListRow key={q} text={q} dotColor={algu.teal} spacing={spacing.sm} />
                ))}
              </>
            ) : null}

            <View style={{ marginTop: spacing.lg }}>
              <Text
                text="Compensation Philosophy"
                style={{
                  fontFamily: typography.primary.medium,
                  color: algu.text,
                  fontSize: 14,
                  marginBottom: spacing.xs,
                }}
              />
              <Text
                text={COMPENSATION_PHILOSOPHY}
                style={{ color: algu.textDim, fontSize: 12.5, lineHeight: 19, marginBottom: spacing.lg }}
              />

              <Text
                text="The Fine Print"
                style={{
                  fontFamily: typography.primary.medium,
                  color: algu.text,
                  fontSize: 14,
                  marginBottom: spacing.xs,
                }}
              />
              <Text
                text={FINE_PRINT}
                style={{ color: algu.steel, fontSize: 11.5, lineHeight: 17, marginBottom: spacing.lg }}
              />

              <AlguPrimaryButton
                text="Apply for this role →"
                onPress={() => navigation.navigate("alguApply", { jobId: job.id })}
                fontFamily={typography.primary.medium}
                style={{ paddingVertical: 8, paddingHorizontal: 14, alignSelf: "flex-start", fontSize: 12.5 }}
              />
            </View>
          </>
        )}
      </View>

      <View style={{ height: spacing.xxl }} />
    </AlguScreenShell>
  )
}

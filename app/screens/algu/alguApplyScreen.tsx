import { FC, useState } from "react"
import * as DocumentPicker from "expo-document-picker"
import { View } from "react-native"

import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { AlguAuthGate } from "@/components/algu/alguAuthGate"
import { AlguPrimaryButton } from "@/components/algu/alguPrimitives"
import { AlguIllustration } from "@/components/algu/alguIllustration"
import { AlguScreenShell } from "@/components/algu/alguScreenShell"
import type { alguStackScreenProps } from "@/navigators/alguNavigationTypes"
import { submitApplication } from "@/services/watermelon/applicationsSync"
import { useSupabaseAuth } from "@/services/supabase/useSupabaseAuth"
import { useAppTheme } from "@/theme/context"
import { algu } from "@/theme/alguPalette"

interface AlguApplyScreenProps extends alguStackScreenProps<"alguApply"> {}

type SubmitState = "idle" | "submitting" | "done" | "error"

export const alguApplyScreen: FC<AlguApplyScreenProps> = function alguApplyScreen({ route, navigation }) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { jobId } = route.params
  const { session } = useSupabaseAuth()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState(session?.user?.email ?? "")
  const [phone, setPhone] = useState("")
  const [coverNote, setCoverNote] = useState("")
  const [resume, setResume] = useState<DocumentPicker.DocumentPickerAsset | null>(null)
  const [state, setState] = useState<SubmitState>("idle")
  const [error, setError] = useState("")

  const pickResume = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      copyToCacheDirectory: true,
    })
    if (!result.canceled && result.assets?.[0]) {
      setResume(result.assets[0])
    }
  }

  const canSubmit = fullName.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const onSubmit = async () => {
    if (!canSubmit) {
      setError("Please enter your name and a valid email.")
      return
    }
    setError("")
    setState("submitting")
    try {
      await submitApplication({
        jobId,
        fullName,
        email,
        phone,
        coverNote,
        resumeUri: resume?.uri ?? null,
        resumeFileName: resume?.name ?? null,
      })
      setState("done")
    } catch {
      setState("error")
      setError("Something went wrong submitting your application. Please try again.")
    }
  }

  if (state === "done") {
    return (
      <AlguScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xxl, alignItems: "flex-start" }}>
          <Text
            text="Application received"
            style={{ fontFamily: typography.primary.bold, color: algu.text, fontSize: 28, marginBottom: spacing.sm }}
          />
          <Text
            text="Thanks — your application was saved and will sync to our team as soon as you're online. We'll follow up by email."
            style={{ color: algu.textDim, fontSize: 15, lineHeight: 22, marginBottom: spacing.lg }}
          />
          <AlguPrimaryButton
            text="Back to careers"
            onPress={() => navigation.navigate("alguCareers")}
            fontFamily={typography.primary.medium}
          />
        </View>
      </AlguScreenShell>
    )
  }

  return (
    <AlguScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl }}>
        <AlguIllustration variant="careers" height={130} style={{ marginBottom: spacing.lg }} />
      </View>

      <AlguAuthGate
        onNavigateToSignUp={() => navigation.navigate("alguSignUp")}
        title="Sign in to apply"
        subtitle="Applications are tied to your account so we can follow up and so you can track status later."
      >
      <View style={{ paddingHorizontal: spacing.lg }}>
        <Text
          text="APPLY"
          style={{
            fontFamily: typography.primary.medium,
            color: algu.signal,
            fontSize: 12,
            letterSpacing: 2,
            marginBottom: spacing.sm,
          }}
        />
        <Text
          text="Submit your application"
          style={{ fontFamily: typography.primary.bold, color: algu.text, fontSize: 28, marginBottom: spacing.lg }}
        />

        <TextField
          label="Full name"
          value={fullName}
          onChangeText={setFullName}
          containerStyle={{ marginBottom: spacing.md }}
          style={{ color: algu.text }}
          inputWrapperStyle={{ backgroundColor: algu.surface, borderColor: algu.hairline }}
          LabelTextProps={{ style: { color: algu.textDim } }}
          placeholderTextColor={algu.textDim}
        />
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={{ marginBottom: spacing.md }}
          style={{ color: algu.text }}
          inputWrapperStyle={{ backgroundColor: algu.surface, borderColor: algu.hairline }}
          LabelTextProps={{ style: { color: algu.textDim } }}
          placeholderTextColor={algu.textDim}
        />
        <TextField
          label="Phone (optional)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          containerStyle={{ marginBottom: spacing.md }}
          style={{ color: algu.text }}
          inputWrapperStyle={{ backgroundColor: algu.surface, borderColor: algu.hairline }}
          LabelTextProps={{ style: { color: algu.textDim } }}
          placeholderTextColor={algu.textDim}
        />
        <TextField
          label="Cover note (optional)"
          value={coverNote}
          onChangeText={setCoverNote}
          multiline
          numberOfLines={4}
          containerStyle={{ marginBottom: spacing.md }}
          style={{ color: algu.text, minHeight: 90, textAlignVertical: "top" }}
          inputWrapperStyle={{ backgroundColor: algu.surface, borderColor: algu.hairline }}
          LabelTextProps={{ style: { color: algu.textDim } }}
          placeholderTextColor={algu.textDim}
        />

        <Text
          text="Resume"
          style={{ fontFamily: typography.primary.medium, color: algu.textDim, fontSize: 13, marginBottom: 6 }}
        />
        <AlguPrimaryButton
          text={resume ? resume.name : "Choose file (PDF or Word) →"}
          onPress={pickResume}
          fontFamily={typography.primary.medium}
          style={{
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: algu.steel,
            color: algu.text,
            marginBottom: spacing.lg,
          }}
        />

        {error ? (
          <Text text={error} style={{ color: algu.danger, fontSize: 13, marginBottom: spacing.md }} />
        ) : null}

        <AlguPrimaryButton
          text={state === "submitting" ? "Submitting…" : "Submit application"}
          onPress={onSubmit}
          fontFamily={typography.primary.medium}
          disabled={state === "submitting"}
        />
      </View>
      </AlguAuthGate>

      <View style={{ height: spacing.xxl }} />
    </AlguScreenShell>
  )
}

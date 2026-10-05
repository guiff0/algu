import { FC, useState } from "react"
import { View } from "react-native"

import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { AlguPrimaryButton } from "@/components/algu/alguPrimitives"
import { AlguIllustration } from "@/components/algu/alguIllustration"
import { AlguScreenShell } from "@/components/algu/alguScreenShell"
import type { alguStackScreenProps } from "@/navigators/alguNavigationTypes"
import { isSupabaseConfigured } from "@/services/supabase/client"
import { useSupabaseAuth } from "@/services/supabase/useSupabaseAuth"
import { useAppTheme } from "@/theme/context"
import { algu } from "@/theme/alguPalette"

interface AlguLoginScreenProps extends alguStackScreenProps<"alguLogin"> {}

export const alguLoginScreen: FC<AlguLoginScreenProps> = function alguLoginScreen({ route, navigation }) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { signIn, isAuthenticated, signOut } = useSupabaseAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async () => {
    setError("")
    setSubmitting(true)
    try {
      await signIn(email, password)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't sign in — check your details and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AlguScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl, maxWidth: 420 }}>
        <AlguIllustration variant="home" height={120} style={{ marginBottom: spacing.lg }} />
        <Text
          text="ACCOUNT"
          style={{
            fontFamily: typography.primary.medium,
            color: algu.signal,
            fontSize: 12,
            letterSpacing: 2,
            marginBottom: spacing.sm,
          }}
        />
        <Text
          text="Sign in"
          style={{ fontFamily: typography.primary.bold, color: algu.text, fontSize: 28, marginBottom: spacing.lg }}
        />

        {!isSupabaseConfigured ? (
          <Text
            text="Supabase isn't configured yet in this build — add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to .env to enable real sign-in."
            style={{ color: algu.amber, fontSize: 13, lineHeight: 19, marginBottom: spacing.lg }}
          />
        ) : null}

        {isAuthenticated ? (
          <>
            <Text
              text="You're already signed in."
              style={{ color: algu.textDim, fontSize: 15, marginBottom: spacing.md }}
            />
            <AlguPrimaryButton text="Sign out" onPress={signOut} fontFamily={typography.primary.medium} />
          </>
        ) : (
          <>
            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              containerStyle={{ marginBottom: spacing.md }}
              style={{ color: algu.text }}
              inputWrapperStyle={{ backgroundColor: algu.surface, borderColor: algu.hairline }}
              LabelTextProps={{ style: { color: algu.textDim } }}
              placeholderTextColor={algu.textDim}
            />
            <TextField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              containerStyle={{ marginBottom: spacing.md }}
              style={{ color: algu.text }}
              inputWrapperStyle={{ backgroundColor: algu.surface, borderColor: algu.hairline }}
              LabelTextProps={{ style: { color: algu.textDim } }}
              placeholderTextColor={algu.textDim}
            />

            {error ? (
              <Text text={error} style={{ color: algu.danger, fontSize: 13, marginBottom: spacing.md }} />
            ) : null}

            <AlguPrimaryButton
              text={submitting ? "Signing in…" : "Sign in"}
              onPress={onSubmit}
              fontFamily={typography.primary.medium}
              disabled={submitting}
            />

            <Text
              text="Need an account? Sign up →"
              onPress={() => navigation.navigate("alguSignUp")}
              style={{ color: algu.textDim, fontSize: 13, marginTop: spacing.lg }}
            />
          </>
        )}
      </View>

      <View style={{ height: spacing.xxl }} />
    </AlguScreenShell>
  )
}

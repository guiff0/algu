import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { alguApplyScreen } from "@/screens/algu/alguApplyScreen"
import { alguCareersScreen } from "@/screens/algu/alguCareersScreen"
import { alguContentScreen } from "@/screens/algu/alguContentScreen"
import { alguHomeScreen } from "@/screens/algu/alguHomeScreen"
import { alguJobDetailScreen } from "@/screens/algu/alguJobDetailScreen"
import { alguLoginScreen } from "@/screens/algu/alguLoginScreen"
import { alguSignUpScreen } from "@/screens/algu/alguSignUpScreen"

import type { AlguStackParamList } from "./alguNavigationTypes"

const Stack = createNativeStackNavigator<AlguStackParamList>()

export function alguNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="alguHome">
      <Stack.Screen name="alguHome" component={alguHomeScreen} />

      <Stack.Screen name="alguProducts" component={alguContentScreen} initialParams={{ pageKey: "products" }} />
      <Stack.Screen name="alguServices" component={alguContentScreen} initialParams={{ pageKey: "services" }} />
      <Stack.Screen
        name="alguTechnologies"
        component={alguContentScreen}
        initialParams={{ pageKey: "technologies" }}
      />
      <Stack.Screen
        name="alguIndustries"
        component={alguContentScreen}
        initialParams={{ pageKey: "industries" }}
      />
      <Stack.Screen
        name="alguDepartments"
        component={alguContentScreen}
        initialParams={{ pageKey: "departments" }}
      />
      <Stack.Screen name="alguAbout" component={alguContentScreen} initialParams={{ pageKey: "about" }} />
      <Stack.Screen name="alguContact" component={alguContentScreen} initialParams={{ pageKey: "contact" }} />
      <Stack.Screen
        name="alguDetail"
        component={alguContentScreen}
        initialParams={{ pageKey: "services-quantum-optimization" }}
      />
      <Stack.Screen
        name="alguGovernment"
        component={alguContentScreen}
        initialParams={{ pageKey: "government" }}
      />

      <Stack.Screen name="alguCareers" component={alguCareersScreen} />
      <Stack.Screen name="alguJobDetail" component={alguJobDetailScreen} />
      <Stack.Screen name="alguApply" component={alguApplyScreen} />

      <Stack.Screen name="alguLogin" component={alguLoginScreen} />
      <Stack.Screen name="alguSignUp" component={alguSignUpScreen} />

      <Stack.Screen name="alguLeadership" component={alguContentScreen} initialParams={{ pageKey: "leadership" }} />
      <Stack.Screen name="alguLegal" component={alguContentScreen} initialParams={{ pageKey: "legal" }} />
      <Stack.Screen name="alguGovernance" component={alguContentScreen} initialParams={{ pageKey: "governance" }} />
      <Stack.Screen
        name="alguDocumentation"
        component={alguContentScreen}
        initialParams={{ pageKey: "documentation" }}
      />
      <Stack.Screen name="alguApiAccess" component={alguContentScreen} initialParams={{ pageKey: "api-access" }} />
      <Stack.Screen
        name="alguWhitepapers"
        component={alguContentScreen}
        initialParams={{ pageKey: "whitepapers" }}
      />
      <Stack.Screen
        name="alguCaseStudies"
        component={alguContentScreen}
        initialParams={{ pageKey: "case-studies" }}
      />
      <Stack.Screen name="alguNewsroom" component={alguContentScreen} initialParams={{ pageKey: "newsroom" }} />
      <Stack.Screen name="alguLearn" component={alguContentScreen} initialParams={{ pageKey: "learn" }} />
    </Stack.Navigator>
  )
}

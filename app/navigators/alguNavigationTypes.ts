import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type AlguStackParamList = {
  alguHome: undefined
  alguProducts: { pageKey: "products" }
  alguServices: { pageKey: "services" }
  alguTechnologies: { pageKey: "technologies" }
  alguIndustries: { pageKey: "industries" }
  alguDepartments: { pageKey: "departments" }
  alguAbout: { pageKey: "about" }
  alguContact: { pageKey: "contact" }
  alguGovernment: { pageKey: "government" }
  alguDetail: { pageKey: string }
  alguCareers: undefined
  alguJobDetail: { jobId: string }
  alguApply: { jobId: string }
  alguLogin: undefined
  alguSignUp: undefined
  alguLeadership: { pageKey: "leadership" }
  alguLegal: { pageKey: "legal" }
  alguGovernance: { pageKey: "governance" }
  alguDocumentation: { pageKey: "documentation" }
  alguApiAccess: { pageKey: "api-access" }
  alguWhitepapers: { pageKey: "whitepapers" }
  alguCaseStudies: { pageKey: "case-studies" }
  alguNewsroom: { pageKey: "newsroom" }
  alguLearn: { pageKey: "learn" }
}

export type alguStackScreenProps<T extends keyof AlguStackParamList> = NativeStackScreenProps<
  AlguStackParamList,
  T
>

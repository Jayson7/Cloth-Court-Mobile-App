declare module "@react-native-async-storage/async-storage";
// src/@types/react-native-onboarding-swiper.d.ts
declare module "react-native-onboarding-swiper" {
  import { Component } from "react";
  import { ViewStyle, TextStyle } from "react-native";

  export interface Page {
    backgroundColor: string;
    image: JSX.Element;
    title: string;
    subtitle: string;
  }

  interface OnboardingProps {
    pages: Page[];
    onDone: () => void;
    onSkip: () => void;
    titleStyles?: TextStyle;
    subtitleStyles?: TextStyle;
    pageContainerStyles?: ViewStyle;
  }

  export default class Onboarding extends Component<OnboardingProps> {}
}

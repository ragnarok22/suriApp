import { Dimensions, StyleSheet, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from 'lottie-react-native';
import { useNavigation } from "expo-router";
import { useConfig } from "@/hooks/useConfig";
import { useThemeColor } from "@/hooks/useThemeColor";
import DoneButton from "@/components/onboarding/DoneButton";
import SkipButton from "@/components/onboarding/SkipButton";
import NextButton from "@/components/onboarding/NextButton";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const config = useConfig();
  const backgroundColor = useThemeColor({}, 'background');
  const { t } = useTranslation();

  const pages = [{
    backgroundColor,
    image: (
      <Lottie
        source={require('../assets/animations/greetings.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    ),
    title: t('onboarding.welcome'),
    subtitle: t('onboarding.manage_your_mobile_balance'),
  }, {
    backgroundColor,
    image: (
      <Lottie
        source={require('../assets/animations/languages.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    ),
    title: 'Multiple languages',
    subtitle: 'Available in English, Dutch, Spanish and Portuguese',
  }];

  const handleDone = async () => {
    await config.disableNewUser();
    navigation.navigate('index');
  }

  const handleSkip = async () => {
    await config.disableNewUser();
    navigation.navigate('index');
  }

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleSkip}
        SkipButtonComponent={SkipButton}
        NextButtonComponent={NextButton}
        DoneButtonComponent={DoneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={pages}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width * 0.8,
    height: width,
  },
})

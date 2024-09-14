import { Dimensions, StyleSheet, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from 'lottie-react-native';
import { useNavigation } from "expo-router";
import { useConfig } from "@/hooks/useConfig";
import { useThemeColor } from "@/hooks/useThemeColor";

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const config = useConfig();
  const backgroundColor = useThemeColor({}, 'background');

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
    title: 'Welcome',
    subtitle: 'Manage your Mobile Balance and Data',
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

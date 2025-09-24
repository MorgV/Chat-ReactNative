import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {
  colors,
  radius,
  spacingX,
  spacingY,
  verticalScale,
} from "@/constants/theme";

const Settings = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Настройки</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <Text style={{ color: colors.primaryLight }}>Закрыть</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: radius._20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    padding: spacingY._10,
  },
});

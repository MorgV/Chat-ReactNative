import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContexts";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(main)/profileModal"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="(main)/NewConversationModal"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});

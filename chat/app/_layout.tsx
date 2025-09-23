import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContexts";

const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
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

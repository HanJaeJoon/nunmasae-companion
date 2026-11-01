import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeColors } from "@/kit/theme";
import { THEME_OVERRIDES } from "@/lib/branding";
import { SettingsProvider } from "@/lib/settings";

// 화면 본문이 자체 타이틀을 그리므로 네이티브 헤더는 끈다.
// 켜두면 라우트명("index")이 그대로 헤더에 노출된다.
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <Shell />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}

// headerShown: false 라 헤더가 상태바 공간을 확보해 주지 않고 앱은 edge-to-edge 로
// 그려지므로, 상단 인셋을 여기서 한 번 주고 배경색을 칠해 인셋 띠를 화면과 맞춘다.
function Shell() {
  const colors = useThemeColors(THEME_OVERRIDES);
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* 지정하지 않으면 라이트 모드에서도 밝은 아이콘이 그려져 밝은 배경에 묻힌다 */}
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

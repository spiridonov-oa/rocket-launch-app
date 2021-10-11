import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const LaunchDetailsScreen = (params: any) => {
  const uri = params?.route?.params?.params?.uri;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri }} />
    </View>
  );
};

export default LaunchDetailsScreen;

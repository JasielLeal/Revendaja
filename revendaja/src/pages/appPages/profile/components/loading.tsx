// components/LoadingOverlay.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export function LoadingOverlay() {
    return (
        <View className="flex items-center justify-center bg-bg flex-1">
            <ActivityIndicator size="large" color="#FF7100" />
        </View>
    );
}


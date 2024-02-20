import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";
import { colors } from "../../css-styles/commom-styles";
import loaderStyles from "../../css-styles/loader/loader-styles";

export default function Loader() {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true}
      onRequestClose={() => {}}
    >
      <View style={loaderStyles.modalBackground}>
        <View style={loaderStyles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    </Modal>
  );
}

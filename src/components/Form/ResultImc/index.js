import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function ResultImc(props) {
  return (
    <View style={styles.imcContext}>
      <Text style={styles.information}>{props.messageResultImc}</Text>
      <Text style={styles.resultImc}>{props.resultImc}</Text>
    </View>
  );
}

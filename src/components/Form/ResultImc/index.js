import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import styles from "./styles";

export default function ResultImc(props) {
  const onShare = async () => {
    const result = await Share.share({
      message: `Meu imc hoje é: ${props.resultImc}`,
    });
  };

  return (
    <View style={styles.imcContext}>
      <Text style={styles.information}>{props.messageResultImc}</Text>
      <Text style={styles.resultImc}>{props.resultImc}</Text>
      <View style={styles.boxSharedButton}>
        <TouchableOpacity onPress={onShare} style={styles.sharedButton}>
          <Text style={styles.textSharedButton}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

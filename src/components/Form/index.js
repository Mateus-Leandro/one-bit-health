import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [weightErrorMessage, setWeightErrorMessage] = useState(null);
  const [heightErrorMessage, setHeightErrorMessage] = useState(null);
  const errorMessage = "*campo obrigatório";

  function imcCalculator() {
    return setImc((weight / (height * height)).toFixed(2));
  }

  function validationImc() {
    let valid = true;
    setWeightErrorMessage(null);
    setHeightErrorMessage(null);

    if (weight == null) {
      setWeightErrorMessage(errorMessage);
      valid = false;
    }

    if (height == null) {
      setHeightErrorMessage(errorMessage);
      valid = false;
    }

    if (!valid) {
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Preencha o peso e a altura");
      Vibration.vibrate();
      return;
    }

    imcCalculator();
    setHeight(null);
    setWeight(null);
    setMessageImc("Seu imc é igual: ");
    setTextButton("Calcular Novamente");
  }

  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <Text style={styles.errorMessage}>{heightErrorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
          placeholder="Ex. 1.75"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Peso</Text>
        <Text style={styles.errorMessage}>{weightErrorMessage}</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Ex. 72.365"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => {
            validationImc();
          }}
          title={textButton}
        >
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>
      </View>
      <ResultImc messageResultImc={messageImc} resultImc={imc} />
    </View>
  );
}

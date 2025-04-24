import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  Pressable,
  Keyboard,
} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";
import isNotEmpty from "../../functions/Utils";
import FlatListImc from "../FlatListImc";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [weightErrorMessage, setWeightErrorMessage] = useState(null);
  const [heightErrorMessage, setHeightErrorMessage] = useState(null);
  const [imcList, setImcList] = useState([]);
  const errorMessage = "*campo obrigatório";

  function imcCalculator() {
    const heightFormat = height.replace(",", ".");
    const weightFormat = weight.replace(",", ".");
    const resultIcm = (weightFormat / (heightFormat * heightFormat)).toFixed(2);
    setImcList((arr) => [...arr, { id: new Date().getTime(), imc: resultIcm }]);
    setImc(resultIcm);
  }

  function validationImc() {
    const heightValid = isNotEmpty(height);
    const weightValid = isNotEmpty(weight);
    const valid = heightValid && weightValid;

    setWeightErrorMessage(null);
    setHeightErrorMessage(null);

    if (valid) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImc("Seu imc é igual: ");
      setTextButton("Calcular Novamente");
    } else {
      if (imc == null) {
        Vibration.vibrate();
        if (!weightValid) setWeightErrorMessage(errorMessage);
        if (!heightValid) setHeightErrorMessage(errorMessage);
      }

      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Preencha o peso e a altura");
    }
  }

  return (
    <View style={styles.formContext}>
      {imc == null ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
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
              Keyboard.dismiss();
              validationImc();
            }}
            title={textButton}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </Pressable>
      ) : (
        <View style={styles.exibitionResultImc}>
          <ResultImc messageResultImc={messageImc} resultImc={imc} />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => {
              Keyboard.dismiss();
              validationImc();
            }}
            title={textButton}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatListImc imcList={imcList} />
    </View>
  );
}

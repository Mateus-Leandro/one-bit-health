import { FlatList, Text, View } from "react-native";
import styles from "./styles";

export default function FlatListImc(props) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.listImc}
        data={[...props.imcList].reverse()}
        renderItem={({ item }) => {
          return (
            <Text style={styles.textResultImcItem}>
              <Text style={styles.textResultImcList}>Resultado do IMC = </Text>
              {item.imc}
            </Text>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

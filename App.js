import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [navigation, setNavigation] = useState('inicial');

  return (
    <SafeAreaView style={styles.context}>
      <Text style={styles.paragraph}>
        Painel de Estudos
      </Text>
    {navigation === 'inicial' ? (
      <View style={styles.container}>
      <Button style={styles.addB} title={'adicionar atividade'}
      onPress={() => setNavigation('criar')}/>
      <Text style={styles.list}>Lista:</Text>
      <Text style={{fontWeight: 'bold'}}>AQUI VAI A LISTA COMPLETA, NOME DA TAREFA EM NEGRITO E O TEXTO NORMAL</Text>
    </View>
    ) : (
    <View style={styles.container}>
      <TextInput style={styles.inputTitulo}
      placeholder={'Adicionar Título'}
      />
      <TextInput style={styles.inputCont}
      multiline={true}
      placeholder={'Adicionar Conteúdo'}
      />
      <Button style={styles.addB} title={'criar atividade'}
      onPress={() => setNavigation('inicial')}/>
    </View>
    )}
    </SafeAreaView>
  );

}
const styles = StyleSheet.create({
  context: {
    backgroundColor: '#ecf0f1',
  },
  list: {
    marginTop: 5,
  },
  container: {
    flex: 1,
    padding: 8,
  },
  paragraph: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputTitulo: {
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'gray',
    marginVertical: 5,
    padding: 5,
    placeholderTextColor: 'gray'
  },
  inputCont: {
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'gray',
    marginVertical: 5,
    padding: 5,
    height: 100,
    width: '100%',
    placeholderTextColor: 'gray'
  },
  addB: {
    
  }
});

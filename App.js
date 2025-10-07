import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [navigation, setNavigation] = useState('inicial');
  const [studies, setStudies] = useState([]);
  const [title, setTitle] = useState('');
  const [material, setMaterial] = useState('');
  const [editStudyID, setEditStudyID] = useState(null);

  const STORAGE_KEY = '@studies';

  useEffect(() => {
    const loadStudies = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setStudies(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Falha ao carregar planos de estudo.', e);
      }
    };
    loadStudies();
  }, []);

  const saveStudies = async (newStudies) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newStudies));
    } catch (e) {
      console.error('Falha ao salvar estudos.', e);
    }
  };

  const resetForm = () => {
    setTitle('');
    setMaterial('');
    setEditStudyID(null);
    setNavigation('inicial');
  };

  const handleAddStudy = () => {
    if (!title.trim() || !material.trim()) {
      Alert.alert('Erro', 'Preencha o título e o conteúdo.');
      return;
    }

    let updatedStudies;
    if (editStudyID) {
      updatedStudies = studies.map((s) =>
        s.id === editStudyID ? { ...s, title: title.trim(), material: material.trim() } : s
      );
    } else {
      const newStudy = {
        id: Date.now().toString(),
        title: title.trim(),
        material: material.trim(),
      };
      updatedStudies = [...studies, newStudy];
    }
    
    setStudies(updatedStudies);
    saveStudies(updatedStudies);
    resetForm();
  };

  const handleDeleteStudy = (id) => {
     const userConfirmed = window.confirm('Deseja deletar essa receita?');

      if (userConfirmed) {
            const updatedStudies = studies.filter((study) => study.id !== id);
            setStudies(updatedStudies);
            saveStudies(updatedStudies);
  }};

  const handleEditStudy = (study) => {
    setTitle(study.title);
    setMaterial(study.material);
    setEditStudyID(study.id);
    setNavigation('criar');
  };

  return (
    <SafeAreaProvider style={styles.context}>
      <Text style={styles.paragraph}>Painel de Estudos</Text>
      {navigation === 'inicial' ? (
        <View style={styles.container}>
          <Button title={'Adicionar atividade'} onPress={() => setNavigation('criar')} />
          <Text style={styles.list}>Lista:</Text>
          {studies.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum estudo cadastrado.</Text>
          ) : (
            <FlatList
              data={studies}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemMaterial}>{item.material}</Text>
                  </View>
                  <View style={styles.itemButtons}>
                    <Button title="Editar" onPress={() => handleEditStudy(item)} />
                    <View style={{ height: 4 }} />
                    <Button title="Apagar" color="#d11a2a" onPress={() => handleDeleteStudy(item.id)} />
                  </View>
                </View>
              )}
            />
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder={'Adicionar Título'}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.inputCont]}
            multiline={true}
            placeholder={'Adicionar Conteúdo'}
            value={material}
            onChangeText={setMaterial}
          />
          <Button title={editStudyID ? 'Salvar alteração' : 'Criar atividade'} onPress={handleAddStudy} />
          <View style={{ height: 8 }} />
          <Button title={'Cancelar'} color={'gray'} onPress={resetForm} />
        </View>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  context: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  paragraph: {
    marginVertical: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputCont: {
    height: 120,
    textAlignVertical: 'top',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  itemTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemMaterial: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  itemButtons: {
    flexDirection: 'column',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});
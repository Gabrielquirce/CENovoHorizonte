import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const ObservacoesScreen = () => {
  // Estados para todos os campos
  const [matricula, setMatricula] = useState('');
  const [escola, setEscola] = useState('');
  const [irmaos, setIrmaos] = useState('');
  const [irmaosNomes, setIrmaosNomes] = useState('');
  const [especialista, setEspecialista] = useState('');
  const [especialistaTipo, setEspecialistaTipo] = useState('');
  const [alergias, setAlergias] = useState('');
  const [alergiaTipo, setAlergiaTipo] = useState('');
  const [medicamento, setMedicamento] = useState('');
  const [medicamentoTipo, setMedicamentoTipo] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Seção Observações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Observações</Text>

        {/* Matrícula */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Matrícula</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={matricula}
              onValueChange={setMatricula}
              dropdownIconColor="#666">
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Inicial" value="inicial" />
              <Picker.Item label="Transferência Municipal/Estadual" value="transferencia_municipal_estadual" />
              <Picker.Item label="Transferência Particular" value="transferencia_particular" />
            </Picker>
          </View>
          {(matricula === 'transferencia_municipal_estadual' || matricula === 'transferencia_particular') && (
            <TextInput
              style={styles.input}
              placeholder="Qual Escola"
              value={escola}
              onChangeText={setEscola}
            />
          )}
        </View>

        {/* Irmão(s) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Irmão(s)</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={irmaos}
              onValueChange={setIrmaos}
              dropdownIconColor="#666">
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Sim" value="sim" />
              <Picker.Item label="Não" value="nao" />
            </Picker>
          </View>
          {irmaos === 'sim' && (
            <TextInput
              style={styles.input}
              placeholder="Qual(s) Irmão(s)?"
              value={irmaosNomes}
              onChangeText={setIrmaosNomes}
            />
          )}
        </View>

        {/* Especialista */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Especialista</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={especialista}
              onValueChange={setEspecialista}
              dropdownIconColor="#666">
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Sim" value="sim" />
              <Picker.Item label="Não" value="nao" />
            </Picker>
          </View>
          {especialista === 'sim' && (
            <TextInput
              style={styles.input}
              placeholder="Ex: Neurologista, Fonoaudiólogo"
              value={especialistaTipo}
              onChangeText={setEspecialistaTipo}
            />
          )}
        </View>

        {/* Alergias */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Alergias</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={alergias}
              onValueChange={setAlergias}
              dropdownIconColor="#666">
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Sim" value="sim" />
              <Picker.Item label="Não" value="nao" />
            </Picker>
          </View>
          {alergias === 'sim' && (
            <TextInput
              style={styles.input}
              placeholder="Ex: Alimentação, Remédios..."
              value={alergiaTipo}
              onChangeText={setAlergiaTipo}
            />
          )}
        </View>

        {/* Medicamento em Uso */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medicamento em Uso</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={medicamento}
              onValueChange={setMedicamento}
              dropdownIconColor="#666">
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Sim" value="sim" />
              <Picker.Item label="Não" value="nao" />
            </Picker>
          </View>
          {medicamento === 'sim' && (
            <TextInput
              style={styles.input}
              placeholder="Qual medicamento?"
              value={medicamentoTipo}
              onChangeText={setMedicamentoTipo}
            />
          )}
        </View>
      </View>

      {/* Botões */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/forms-info')}
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/forms-paterno')}
            >
              <Text style={styles.backLink}>Voltar</Text>
            </TouchableOpacity>
    </ScrollView>
  );
};

// Estilos idênticos aos formulários anteriores
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginTop: 40,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    color: '#902121',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backLink: {
    color: '#902121',
    textAlign: 'center',
    marginTop: 30,
    paddingBottom: 60,
    width: '100%',
    fontSize: 16,
    fontWeight: "600",
  },
});


export default ObservacoesScreen;
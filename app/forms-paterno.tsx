import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MaskInput from 'react-native-mask-input';

export default function FamiliaresPaternoScreen() {
  // Estados para Paterno
  const [nomePaterno, setNomePaterno] = useState('');
  const [cepPaterno, setCepPaterno] = useState('');
  const [telefonePaterno, setTelefonePaterno] = useState('');
  const [trabalhoPaterno, setTrabalhoPaterno] = useState('');
  const [nascimentoPaterno, setNascimentoPaterno] = useState('');
  const [cpfPaterno, setCpfPaterno] = useState('');
  const [emailPaterno, setEmailPaterno] = useState('');
  const [telefoneTrabalhoPaterno, setTelefoneTrabalhoPaterno] = useState('');
  const [enderecoPaterno, setEnderecoPaterno] = useState('');
  const [rgPaterno, setRgPaterno] = useState('');
  const [profissaoPaterno, setProfissaoPaterno] = useState('');

  // Máscaras (iguais à tela materna)
  const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  const telefoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  const rgMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];
  const dataMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  const handleSubmit = () => {
    // Validação igual à tela materna
    router.push('/forms-obs'); // Ajuste para próxima tela do fluxo
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
      contentContainerStyle={[styles.scrollContainer, { minHeight: '100%' }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dados dos Familiares</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Responsável Paterno</Text>
          <View style={styles.formContainer}>
          <View style={styles.form}>
            {/* Nome */}
            <TextInput
              style={styles.inputFull}
              placeholder="Nome do Responsável Paterno"
              value={nomePaterno}
              onChangeText={setNomePaterno}
            />

            {/* CEP e Telefone */}
            <View style={styles.row}>
              <MaskInput
                style={styles.input}
                placeholder="CEP"
                value={cepPaterno}
                onChangeText={setCepPaterno}
                mask={cepMask}
                keyboardType="numeric"
              />
              <MaskInput
                style={styles.input}
                placeholder="Telefone"
                value={telefonePaterno}
                onChangeText={setTelefonePaterno}
                mask={telefoneMask}
                keyboardType="phone-pad"
              />
            </View>

            {/* Local Trabalho */}
            <TextInput
              style={styles.inputFull}
              placeholder="Local de Trabalho"
              value={trabalhoPaterno}
              onChangeText={setTrabalhoPaterno}
            />

            {/* Nascimento e CPF */}
            <View style={styles.row}>
              <MaskInput
                style={styles.input}
                placeholder="Data de Nascimento"
                value={nascimentoPaterno}
                onChangeText={setNascimentoPaterno}
                mask={dataMask}
                keyboardType="numeric"
              />
              <MaskInput
                style={styles.input}
                placeholder="CPF"
                value={cpfPaterno}
                onChangeText={setCpfPaterno}
                mask={cpfMask}
                keyboardType="numeric"
              />
            </View>

            {/* Email */}
            <TextInput
              style={styles.inputFull}
              placeholder="Email"
              value={emailPaterno}
              onChangeText={setEmailPaterno}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Telefone Trabalho e Endereço */}
            <View style={styles.row}>
              <MaskInput
                style={styles.input}
                placeholder="Telefone do Trabalho"
                value={telefoneTrabalhoPaterno}
                onChangeText={setTelefoneTrabalhoPaterno}
                mask={telefoneMask}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Endereço"
                value={enderecoPaterno}
                onChangeText={setEnderecoPaterno}
              />
            </View>

            {/* RG e Profissão */}
            <View style={styles.row}>
              <MaskInput
                style={styles.input}
                placeholder="RG"
                value={rgPaterno}
                onChangeText={setRgPaterno}
                mask={rgMask}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Profissão"
                value={profissaoPaterno}
                onChangeText={setProfissaoPaterno}
              />
            </View>
          </View>
        </View>
      </View>

        {/* Botões */}
        <TouchableOpacity style={styles.button}
        onPress={() => router.push('/forms-obs') }>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/forms-materno')}
            >
              <Text style={styles.backLink}>Voltar</Text>
            </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos IDÊNTICOS à tela materna
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#902121',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    flex: 1,
    minHeight: 500,
  },
  sectionTitle: {
    color: '#902121',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  form: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  inputFull: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
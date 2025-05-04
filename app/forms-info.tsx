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
import MaskInput from 'react-native-mask-input';
import { downloadTerms } from '../utils/downloadTerms';

const FinalScreen = () => {
  // Estados
  const [resideCom, setResideCom] = useState('');
  const [responsavelFinanceiro, setResponsavelFinanceiro] = useState('');
  const [telefoneFinanceiro, setTelefoneFinanceiro] = useState('');
  const [pessoasAutorizadas, setPessoasAutorizadas] = useState('');

  // Máscaras
  const telefoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Seção Reside Com */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reside Com</Text>
        <TextInput
          style={styles.inputFull}
          placeholder="Ex: Pai, Mãe, Avós..."
          value={resideCom}
          onChangeText={setResideCom}
        />
      </View>

      {/* Responsável Financeiro */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsável Financeiro</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Responsável"
            value={responsavelFinanceiro}
            onChangeText={setResponsavelFinanceiro}
          />
          <MaskInput
            style={styles.input}
            placeholder="Telefone"
            value={telefoneFinanceiro}
            onChangeText={setTelefoneFinanceiro}
            mask={telefoneMask}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Pessoas Autorizadas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pessoas Autorizadas a Buscar</Text>
        <TextInput
          style={styles.inputFull}
          placeholder="Nomes completos separados por vírgula"
          value={pessoasAutorizadas}
          onChangeText={setPessoasAutorizadas}
          multiline
        />
      </View>
      <View style={styles.alertBox}>
        <Text style={styles.alertText}>
          Atenção: Envie os documentos necessários para o e-mail{' '}
          <Text style={{ fontWeight: 'bold' }}>email@email.com.br</Text>.

            {'\n\n'}
            Baixe os termos de responsabilidade no botão abaixo.

            {'\n\n'}
            Você pode:
            {'\n'}• Imprimir os termos e levar pessoalmente à escola; ou
            {'\n'}• Baixar, assinar eletronicamente e enviar por e-mail.

            {'\n\n'}
            Para fazer a assinatura eletrônica, acesse:{'\n'}
          <Text selectable style={{ color: '#0645AD' }}>
            https://www.gov.br/pt-br/servicos/assinatura-eletronica
          </Text>
        </Text>
      </View>

      <View style={styles.buttonRow}>
  <TouchableOpacity
    style={[styles.button, styles.halfButton]}
    onPress={downloadTerms}
  >
    <Text style={styles.buttonText}>Baixar Termos</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.button, styles.halfButton]}
    onPress={() => router.push('/home')}
  >
    <Text style={styles.buttonText}>Cadastrar</Text>
  </TouchableOpacity>
      </View>
            <TouchableOpacity
              onPress={() => router.push('/forms-obs')}
            >
              <Text style={styles.backLink}>Voltar</Text>
            </TouchableOpacity>
    </ScrollView>
  );
};

// Estilos
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
  inputFull: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  alertBox: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffeeba',
  },
  alertText: {
    color: '#856404',
    fontSize: 14,
    lineHeight: 20,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionButton: {
    flexBasis: '48%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#902121', 
    paddingLeft: 40,
  },
  button: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  
  halfButton: {
    flex: 1,
    marginHorizontal: 5, // espaçamento entre botões
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


export default FinalScreen;
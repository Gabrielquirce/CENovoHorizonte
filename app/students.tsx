import * as FileSystem from 'expo-file-system';
import { printAsync } from 'expo-print';
import { router } from 'expo-router';
import { shareAsync } from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Student {
  id: string;
  nome: string;
  dataNascimento: string;
  naturalidade: string;
  nacionalidade: string;
  sexo: string;
  cpf: string;
  rg: string;
  anoLetivo: string;
  termo: string;
  folha: string;
  livro: string;
  matricula: string;
  turno: string;
  tipoSanguineo: string;
  raca: string;
  
  mae: {
    nomeMae: string;
    nascimentoMae: string;
    enderecoMae: string;
    cepMae: string;
    cpfMae: string;
    rgMae: string;
    profissaoMae: string;
    telefoneMae: string;
    emailMae: string;
    trabalhoMae: string;
    telefoneTrabalhoMae: string;
  };
  
  pai: {
    nomePai: string;
    nascimentoPai: string;
    enderecoPai: string;
    cepPai: string;
    cpfPai: string;
    rgPai: string;
    profissaoPai: string;
    telefonePai: string;
    emailPai: string;
    TrabalhoPai: string;
    telefoneTrabalhoPai: string;
  };
  
  observacoes: {
    matriculaTipo: string;
    escola: string;
    temIrmaos: string;
    irmaosNome: string;
    temEspecialista: string;
    especialista: string;
    temAlergias: string;
    alergia: string;
    temMedicamento: string;
    medicamento: string;
    reside: string;
    respNome: string;
    respTelefone: string;
    pessoasAutorizadas: string;
  };
}

export default function StudentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mockData: Student[] = await new Promise(resolve => 
          setTimeout(() => resolve([
            {
              id: '1',
              nome: 'João Silva',
              dataNascimento: '01/01/2010',
              naturalidade: 'São Paulo',
              nacionalidade: 'Brasileira',
              sexo: 'Masculino',
              cpf: '123.456.789-00',
              rg: '12.345.678-9',
              anoLetivo: '2024',
              termo: '1',
              folha: '100',
              livro: 'A',
              matricula: '20240001',
              turno: 'Manhã',
              tipoSanguineo: 'O+',
              raca: 'Parda',
              mae: {
                nomeMae: 'Maria Silva',
                nascimentoMae: '01/01/1980',
                enderecoMae: 'Rua Exemplo, 123',
                cepMae: '12345-678',
                cpfMae: '987.654.321-00',
                rgMae: '98.765.432-1',
                profissaoMae: 'Enfermeira',
                telefoneMae: '(11) 99999-9999',
                emailMae: 'maria@email.com',
                trabalhoMae: 'Hospital Central',
                telefoneTrabalhoMae: '(11) 88888-8888'
              },
              pai: {
                nomePai: 'José Silva',
                nascimentoPai: '01/01/1975',
                enderecoPai: 'Rua Exemplo, 123',
                cepPai: '12345-678',
                cpfPai: '456.789.123-00',
                rgPai: '45.678.912-3',
                profissaoPai: 'Engenheiro',
                telefonePai: '(11) 77777-7777',
                emailPai: 'jose@email.com',
                TrabalhoPai: 'Construtora XYZ',
                telefoneTrabalhoPai: '(11) 66666-6666'
              },
              observacoes: {
                matriculaTipo: 'Transferência',
                escola: 'Escola Municipal',
                temIrmaos: 'Sim',
                irmaosNome: 'Ana Silva, Pedro Silva',
                temEspecialista: 'Não',
                especialista: '',
                temAlergias: 'Sim',
                alergia: 'Amendoim',
                temMedicamento: 'Sim',
                medicamento: 'Antialérgico',
                reside: 'Pais',
                respNome: 'Maria Silva',
                respTelefone: '(11) 99999-9999',
                pessoasAutorizadas: 'José Silva, Ana Silva'
              }
            }
          ]), 1500)
        );
        setStudents(mockData);
      } catch (err) {
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = students.filter(student =>
    [
      student.nome,
      student.cpf,
      student.mae.nomeMae,
      student.pai.nomePai,
      student.matricula
    ].some(field => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const exportToCSV = async (student: Student) => {
    try {
      const flatData = {
        'Nome': student.nome,
        'Data Nascimento': student.dataNascimento,
        'Naturalidade': student.naturalidade,
        'Nacionalidade': student.nacionalidade,
        'Sexo': student.sexo,
        'CPF': student.cpf,
        'RG': student.rg,
        'Ano Letivo': student.anoLetivo,
        'Termo': student.termo,
        'Folha': student.folha,
        'Livro': student.livro,
        'Matrícula': student.matricula,
        'Turno': student.turno,
        'Tipo Sanguíneo': student.tipoSanguineo,
        'Raça': student.raca,
        'Nome da Mãe': student.mae.nomeMae,
        'Nascimento Mãe': student.mae.nascimentoMae,
        'Endereço Mãe': student.mae.enderecoMae,
        'CEP Mãe': student.mae.cepMae,
        'CPF Mãe': student.mae.cpfMae,
        'RG Mãe': student.mae.rgMae,
        'Profissão Mãe': student.mae.profissaoMae,
        'Telefone Mãe': student.mae.telefoneMae,
        'Email Mãe': student.mae.emailMae,
        'Trabalho Mãe': student.mae.trabalhoMae,
        'Telefone Trabalho Mãe': student.mae.telefoneTrabalhoMae,
        'Nome do Pai': student.pai.nomePai,
        'Nascimento Pai': student.pai.nascimentoPai,
        'Endereço Pai': student.pai.enderecoPai,
        'CEP Pai': student.pai.cepPai,
        'CPF Pai': student.pai.cpfPai,
        'RG Pai': student.pai.rgPai,
        'Profissão Pai': student.pai.profissaoPai,
        'Telefone Pai': student.pai.telefonePai,
        'Email Pai': student.pai.emailPai,
        'Trabalho Pai': student.pai.TrabalhoPai,
        'Telefone Trabalho Pai': student.pai.telefoneTrabalhoPai,
        'Tipo Matrícula': student.observacoes.matriculaTipo,
        'Escola Anterior': student.observacoes.escola,
        'Tem Irmãos': student.observacoes.temIrmaos,
        'Nomes Irmãos': student.observacoes.irmaosNome,
        'Acompanhamento Especialista': student.observacoes.temEspecialista,
        'Especialista': student.observacoes.especialista,
        'Alergias': student.observacoes.temAlergias,
        'Tipo Alergia': student.observacoes.alergia,
        'Uso Medicamento': student.observacoes.temMedicamento,
        'Medicamento': student.observacoes.medicamento,
        'Reside Com': student.observacoes.reside,
        'Responsável Financeiro': student.observacoes.respNome,
        'Contato Responsável': student.observacoes.respTelefone,
        'Pessoas Autorizadas': student.observacoes.pessoasAutorizadas
      };

      const csvHeaders = Object.keys(flatData).join(';');
      const csvValues = Object.values(flatData).join(';');
      const csvContent = `${csvHeaders}\n${csvValues}`;

      const fileUri = FileSystem.documentDirectory + `${student.nome}_dados.csv`;
      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await shareAsync(fileUri);
    } catch (error) {
      console.error('Erro ao exportar CSV:', error);
    }
  };

  const exportToPDF = async (student: Student) => {
    try {
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 20px; }
              h1 { color: #902121; border-bottom: 2px solid #8B0000; }
              h2 { color: #8B0000; margin-top: 25px; }
              .section { margin-bottom: 20px; }
              .row { display: flex; justify-content: space-between; margin: 5px 0; }
              .label { font-weight: bold; width: 40%; }
              .value { width: 55%; }
            </style>
          </head>
          <body>
            <h1>Ficha Completa do Aluno</h1>
            
            <div class="section">
              <h2>Dados Pessoais</h2>
              ${Object.entries({
                'Nome': student.nome,
                'Data Nascimento': student.dataNascimento,
                'Naturalidade': student.naturalidade,
                'Nacionalidade': student.nacionalidade,
                'Sexo': student.sexo,
                'CPF': student.cpf,
                'RG': student.rg,
                'Ano Letivo': student.anoLetivo,
                'Termo': student.termo,
                'Folha': student.folha,
                'Livro': student.livro,
                'Matrícula': student.matricula,
                'Turno': student.turno,
                'Tipo Sanguíneo': student.tipoSanguineo,
                'Raça': student.raca
              }).map(([label, value]) => `
                <div class="row">
                  <span class="label">${label}:</span>
                  <span class="value">${value}</span>
                </div>
              `).join('')}
            </div>

            <div class="section">
              <h2>Dados da Mãe</h2>
              ${Object.entries(student.mae).map(([key, value]) => `
                <div class="row">
                  <span class="label">${key.replace('Mae', '').trim()}:</span>
                  <span class="value">${value}</span>
                </div>
              `).join('')}
            </div>

            <div class="section">
              <h2>Dados do Pai</h2>
              ${Object.entries(student.pai).map(([key, value]) => `
                <div class="row">
                  <span class="label">${key.replace('Pai', '').trim()}:</span>
                  <span class="value">${value}</span>
                </div>
              `).join('')}
            </div>

            <div class="section">
              <h2>Observações</h2>
              ${Object.entries(student.observacoes).map(([key, value]) => `
                <div class="row">
                  <span class="label">${key.replace('tem', '').trim()}:</span>
                  <span class="value">${value}</span>
                </div>
              `).join('')}
            </div>
          </body>
        </html>
      `;

      const { uri } = await printAsync({ html });
      await shareAsync(uri, { mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    }
  };

  const renderDetailModal = () => (
    <Modal
      visible={!!selectedStudent}
      animationType="slide"
      onRequestClose={() => setSelectedStudent(null)}
    >
      <ScrollView style={styles.modalContainer}>
        {selectedStudent && (
          <>
            <Text style={styles.modalTitle}>Ficha Completa do Aluno</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dados Pessoais</Text>
              <DetailItem label="Nome" value={selectedStudent.nome} />
              <DetailItem label="Data de Nascimento" value={selectedStudent.dataNascimento} />
              <DetailItem label="Naturalidade" value={selectedStudent.naturalidade} />
              <DetailItem label="Nacionalidade" value={selectedStudent.nacionalidade} />
              <DetailItem label="Sexo" value={selectedStudent.sexo} />
              <DetailItem label="CPF" value={selectedStudent.cpf} />
              <DetailItem label="RG" value={selectedStudent.rg} />
              <DetailItem label="Ano Letivo" value={selectedStudent.anoLetivo} />
              <DetailItem label="Termo" value={selectedStudent.termo} />
              <DetailItem label="Folha" value={selectedStudent.folha} />
              <DetailItem label="Livro" value={selectedStudent.livro} />
              <DetailItem label="Matrícula" value={selectedStudent.matricula} />
              <DetailItem label="Turno" value={selectedStudent.turno} />
              <DetailItem label="Tipo Sanguíneo" value={selectedStudent.tipoSanguineo} />
              <DetailItem label="Raça" value={selectedStudent.raca} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dados da Mãe</Text>
              <DetailItem label="Nome" value={selectedStudent.mae.nomeMae} />
              <DetailItem label="Data de Nascimento" value={selectedStudent.mae.nascimentoMae} />
              <DetailItem label="Endereço" value={selectedStudent.mae.enderecoMae} />
              <DetailItem label="CEP" value={selectedStudent.mae.cepMae} />
              <DetailItem label="CPF" value={selectedStudent.mae.cpfMae} />
              <DetailItem label="RG" value={selectedStudent.mae.rgMae} />
              <DetailItem label="Profissão" value={selectedStudent.mae.profissaoMae} />
              <DetailItem label="Telefone" value={selectedStudent.mae.telefoneMae} />
              <DetailItem label="Email" value={selectedStudent.mae.emailMae} />
              <DetailItem label="Local de Trabalho" value={selectedStudent.mae.trabalhoMae} />
              <DetailItem label="Telefone do Trabalho" value={selectedStudent.mae.telefoneTrabalhoMae} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dados do Pai</Text>
              <DetailItem label="Nome" value={selectedStudent.pai.nomePai} />
              <DetailItem label="Data de Nascimento" value={selectedStudent.pai.nascimentoPai} />
              <DetailItem label="Endereço" value={selectedStudent.pai.enderecoPai} />
              <DetailItem label="CEP" value={selectedStudent.pai.cepPai} />
              <DetailItem label="CPF" value={selectedStudent.pai.cpfPai} />
              <DetailItem label="RG" value={selectedStudent.pai.rgPai} />
              <DetailItem label="Profissão" value={selectedStudent.pai.profissaoPai} />
              <DetailItem label="Telefone" value={selectedStudent.pai.telefonePai} />
              <DetailItem label="Email" value={selectedStudent.pai.emailPai} />
              <DetailItem label="Local de Trabalho" value={selectedStudent.pai.TrabalhoPai} />
              <DetailItem label="Telefone do Trabalho" value={selectedStudent.pai.telefoneTrabalhoPai} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Observações</Text>
              <DetailItem label="Tipo de Matrícula" value={selectedStudent.observacoes.matriculaTipo} />
              <DetailItem label="Escola Anterior" value={selectedStudent.observacoes.escola} />
              <DetailItem label="Possui Irmãos" value={selectedStudent.observacoes.temIrmaos} />
              <DetailItem label="Nomes dos Irmãos" value={selectedStudent.observacoes.irmaosNome} />
              <DetailItem label="Acompanhamento Especialista" value={selectedStudent.observacoes.temEspecialista} />
              <DetailItem label="Especialista" value={selectedStudent.observacoes.especialista} />
              <DetailItem label="Possui Alergias" value={selectedStudent.observacoes.temAlergias} />
              <DetailItem label="Tipo de Alergia" value={selectedStudent.observacoes.alergia} />
              <DetailItem label="Uso de Medicamento" value={selectedStudent.observacoes.temMedicamento} />
              <DetailItem label="Medicamento" value={selectedStudent.observacoes.medicamento} />
              <DetailItem label="Reside Com" value={selectedStudent.observacoes.reside} />
              <DetailItem label="Responsável Financeiro" value={selectedStudent.observacoes.respNome} />
              <DetailItem label="Contato do Responsável" value={selectedStudent.observacoes.respTelefone} />
              <DetailItem label="Pessoas Autorizadas" value={selectedStudent.observacoes.pessoasAutorizadas} />
            </View>

            <View style={styles.exportButtonsContainer}>
  {/* Botões lado a lado */}
  <View style={styles.exportRow}>
    <TouchableOpacity
      style={[styles.exportButton, styles.pdfButton, styles.halfButton]}
      onPress={() => exportToPDF(selectedStudent)}
    >
      <Text style={styles.exportButtonText}>Exportar PDF</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.exportButton, styles.csvButton, styles.halfButton]}
      onPress={() => exportToCSV(selectedStudent)}
    >
      <Text style={styles.exportButtonText}>Exportar CSV</Text>
    </TouchableOpacity>
  </View>

  {/* Botão de fechar embaixo */}
  <TouchableOpacity
    style={styles.closeButton}
    onPress={() => setSelectedStudent(null)}
  >
    <Text style={styles.closeButtonText}>Fechar</Text>
  </TouchableOpacity>
</View>

          </>
        )}
      </ScrollView>
    </Modal>
  );

  const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value || 'Não informado'}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#902121" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Alunos Cadastrados</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome, CPF ou matrícula..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {filteredStudents.map((student) => (
          <TouchableOpacity
            key={student.id}
            style={styles.studentCard}
            onPress={() => setSelectedStudent(student)}>
            <View style={styles.cardHeader}>
              <Text style={styles.studentName}>{student.nome}</Text>
              <Text style={styles.studentMatricula}>{student.matricula}</Text>
            </View>
            <View style={styles.cardDetails}>
              <Text style={styles.detailText}>CPF: {student.cpf}</Text>
              <Text style={styles.detailText}>Responsável: {student.mae.nomeMae}</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        {renderDetailModal()}
                    <TouchableOpacity
                      onPress={() => router.push('/home')}
                      style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>Voltar</Text>
                    </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#902121',
    padding: 20,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginTop: 20,
  },
  scrollContainer: {
    paddingBottom: 32,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    elevation: 2,
  },
  studentCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  studentMatricula: {
    fontSize: 14,
    color: '#666',
  },
  cardDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#902121',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B0000',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  exportButtonsContainer: {
    marginTop: 20,
    marginBottom: 60,
  },
  
  exportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12, // ou use marginHorizontal nos botões, se não funcionar
  },
  
  halfButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  
  exportButton: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
  },
  
  pdfButton: {
    backgroundColor: '#8B0000',
  },
  
  csvButton: {
    backgroundColor: '#006400',
  },
  
  exportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  
  closeButton: {
    backgroundColor: '#902121',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },

  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 16,
    textAlign: 'center',
  },
});
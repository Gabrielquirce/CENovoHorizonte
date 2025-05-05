import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
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
      // 1. Sanitização correta do nome do arquivo (mantém acentos)
      const sanitizeFileName = (name: string) => {
        return name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove acentos
          .replace(/[^a-zA-Z0-9_]/g, '_')  // Substitui caracteres especiais
          .replace(/_+/g, '_')             // Remove underscores duplicados
          .substring(0, 50);               // Limita tamanho do nome
      };
  
      const fileName = `${sanitizeFileName(student.nome)}_dados.csv`;
      const fileUri = FileSystem.documentDirectory + fileName;
  
      // 2. Função de formatação de valores
      const formatValue = (value: string | undefined) => {
        if (!value) return '""'; // Campos vazios como string vazia entre aspas
        return `"${value.replace(/"/g, '""')}"`; // Escapa aspas duplas
      };
  
      // 3. Criação do conteúdo CSV
      const csvRows = [
        ['Campo', 'Valor'], // Cabeçalho
        ['Nome do Aluno', formatValue(student.nome)],
        ['Data de Nascimento', formatValue(student.dataNascimento)],
        ['Naturalidade', formatValue(student.naturalidade)],
        ['Nacionalidade', formatValue(student.nacionalidade)],
        ['Sexo', formatValue(student.sexo)],
        ['CPF', formatValue(student.cpf)],
        ['RG', formatValue(student.rg)],
        ['Ano Letivo', formatValue(student.anoLetivo)],
        ['Termo', formatValue(student.termo)],
        ['Folha', formatValue(student.folha)],
        ['Livro', formatValue(student.livro)],
        ['Matrícula', formatValue(student.matricula)],
        ['Turno', formatValue(student.turno)],
        ['Tipo Sanguíneo', formatValue(student.tipoSanguineo)],
        ['Raça/Cor', formatValue(student.raca)],
        
        // Dados da Mãe
        ['Nome da Mãe', formatValue(student.mae.nomeMae)],
        ['Nascimento da Mãe', formatValue(student.mae.nascimentoMae)],
        ['Endereço da Mãe', formatValue(student.mae.enderecoMae)],
        ['CEP da Mãe', formatValue(student.mae.cepMae)],
        ['CPF da Mãe', formatValue(student.mae.cpfMae)],
        ['RG da Mãe', formatValue(student.mae.rgMae)],
        ['Profissão da Mãe', formatValue(student.mae.profissaoMae)],
        ['Telefone da Mãe', formatValue(student.mae.telefoneMae)],
        ['Email da Mãe', formatValue(student.mae.emailMae)],
        ['Trabalho da Mãe', formatValue(student.mae.trabalhoMae)],
        ['Telefone do Trabalho da Mãe', formatValue(student.mae.telefoneTrabalhoMae)],
        
        // Dados do Pai
        ['Nome do Pai', formatValue(student.pai.nomePai)],
        ['Nascimento do Pai', formatValue(student.pai.nascimentoPai)],
        ['Endereço do Pai', formatValue(student.pai.enderecoPai)],
        ['CEP do Pai', formatValue(student.pai.cepPai)],
        ['CPF do Pai', formatValue(student.pai.cpfPai)],
        ['RG do Pai', formatValue(student.pai.rgPai)],
        ['Profissão do Pai', formatValue(student.pai.profissaoPai)],
        ['Telefone do Pai', formatValue(student.pai.telefonePai)],
        ['Email do Pai', formatValue(student.pai.emailPai)],
        ['Trabalho do Pai', formatValue(student.pai.TrabalhoPai)],
        ['Telefone do Trabalho do Pai', formatValue(student.pai.telefoneTrabalhoPai)],
        
        // Observações
        ['Tipo de Matrícula', formatValue(student.observacoes.matriculaTipo)],
        ['Escola Anterior', formatValue(student.observacoes.escola)],
        ['Possui Irmãos', formatValue(student.observacoes.temIrmaos)],
        ['Nomes dos Irmãos', formatValue(student.observacoes.irmaosNome)],
        ['Acompanhamento Especialista', formatValue(student.observacoes.temEspecialista)],
        ['Especialista', formatValue(student.observacoes.especialista)],
        ['Possui Alergias', formatValue(student.observacoes.temAlergias)],
        ['Tipo de Alergia', formatValue(student.observacoes.alergia)],
        ['Usa Medicamento', formatValue(student.observacoes.temMedicamento)],
        ['Medicamento', formatValue(student.observacoes.medicamento)],
        ['Reside Com', formatValue(student.observacoes.reside)],
        ['Responsável Financeiro', formatValue(student.observacoes.respNome)],
        ['Contato do Responsável', formatValue(student.observacoes.respTelefone)],
        ['Pessoas Autorizadas', formatValue(student.observacoes.pessoasAutorizadas)],
      ];
  
      // 4. Converter para CSV com BOM
      const csvContent = `\ufeff${csvRows.map(row => row.join(';')).join('\n')}`;
  
      // 5. Escrever arquivo
      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });
  
      // 6. Compartilhar
      await shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Exportar Dados do Aluno',
        UTI: 'public.comma-separated-values-text'
      });
  
    } catch (error) {
      console.error('Erro na exportação:', error);
      alert('Erro ao exportar CSV!\nVerifique o console para detalhes.');
    }
  };

  const exportToPDF = async (student: Student) => {
    try {
      const html = `
      <html>
        <head>
          <style>
              /* Estilos globais */
              body { 
                font-family: Arial; 
                margin: 0;
                padding: 0;
              }
  
              /* Margens da página */
              @page {
                size: A4;
                margin: 50px 30px;
              }
  
              /* Quebra de página */
              .page-break {
                page-break-before: always;
                padding-top: 50px; /* Margem superior da segunda página */
              }
  
              /* Estilos do conteúdo */
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
  
              .section {
                margin-bottom: 25px;
              }
  
              .section-title {
                color: #8B0000;
                border-bottom: 2px solid #8B0000;
                padding-bottom: 5px;
                margin-bottom: 15px;
              }
  
              .row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
              }
  
              .label {
                font-weight: bold;
                width: 45%;
              }
  
              .value {
                width: 50%;
              }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            td {
              padding: 8px;
              border: 1px solid #ddd;
            }
          </style>
        </head>
        <body>
    
          <!-- Página 1 -->
          <div class="page">
            <div class="header">
              <h1>Ficha do Aluno - ${student.nome}</h1>
            </div>
    
            <!-- Dados Pessoais COMPLETOS -->
            <div class="section">
              <h2 class="section-title">Dados Pessoais</h2>
              ${renderSection(student, [
                'nome', 'dataNascimento', 'naturalidade', 'nacionalidade',
                'sexo', 'cpf', 'rg', 'anoLetivo', 'termo', 'folha',
                'livro', 'matricula', 'turno', 'tipoSanguineo', 'raca'
              ])}
            </div>
    
            <!-- Dados da Mãe COMPLETOS -->
            <div class="section">
              <h2 class="section-title">Dados da Mãe</h2>
              ${renderSection(student.mae, [
                'nomeMae', 'nascimentoMae', 'enderecoMae', 'cepMae',
                'cpfMae', 'rgMae', 'profissaoMae', 'telefoneMae',
                'emailMae', 'trabalhoMae', 'telefoneTrabalhoMae'
              ])}
            </div>
          </div>
    
          <!-- Página 2 -->
          <div class="page-break">
            <!-- Dados do Pai COMPLETOS -->
            <div class="section">
              <h2 class="section-title">Dados do Pai</h2>
              ${renderSection(student.pai, [
                'nomePai', 'nascimentoPai', 'enderecoPai', 'cepPai',
                'cpfPai', 'rgPai', 'profissaoPai', 'telefonePai',
                'emailPai', 'TrabalhoPai', 'telefoneTrabalhoPai'
              ])}
            </div>
    
            <!-- Observações COMPLETAS -->
            <div class="section">
              <h2 class="section-title">Observações</h2>
              <table>
                ${renderSection(student.observacoes, [
                  'matriculaTipo', 'escola', 'temIrmaos', 'irmaosNome',
                  'temEspecialista', 'especialista', 'temAlergias', 'alergia',
                  'temMedicamento', 'medicamento', 'reside', 'respNome',
                  'respTelefone', 'pessoasAutorizadas'
                ], true)}
              </table>
            </div>
          </div>
        </body>
      </html>
    `;
  
      const { uri } = await Print.printToFileAsync({
        html,
        width: 595,   // A4 width (210mm)
        height: 842,   // A4 height (297mm)
      });
  
      await shareAsync(uri);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };
  
  // Função auxiliar para renderizar seções
  const renderSection = (data: any, fields: string[], useTable: boolean = false) => {
    return fields.map(field => {
      const label = formatLabel(field);
      const value = data[field] || 'Não informado';
      
      return useTable ? `
        <tr>
          <td><strong>${label}:</strong></td>
          <td>${value}</td>
        </tr>
      ` : `
        <div class="row">
          <span class="label">${label}:</span>
          <span class="value">${value}</span>
        </div>
      `;
    }).join('');
  };

  const formatLabel = (key: string): string => {
    const labels: { [key: string]: string } = {
      // Dados Pessoais
      id: 'ID',
      nome: 'Nome',
      dataNascimento: 'Data de Nascimento',
      naturalidade: 'Naturalidade',
      nacionalidade: 'Nacionalidade',
      sexo: 'Sexo',
      cpf: 'CPF',
      rg: 'RG',
      anoLetivo: 'Ano Letivo',
      termo: 'Termo',
      folha: 'Folha',
      livro: 'Livro',
      matricula: 'Matrícula',
      turno: 'Turno',
      tipoSanguineo: 'Tipo Sanguíneo',
      raca: 'Raça/Cor',
  
      // Dados da Mãe
      nomeMae: 'Nome',
      nascimentoMae: 'Data de Nascimento',
      enderecoMae: 'Endereço',
      cepMae: 'CEP',
      cpfMae: 'CPF',
      rgMae: 'RG',
      profissaoMae: 'Profissão',
      telefoneMae: 'Telefone',
      emailMae: 'E-mail',
      trabalhoMae: 'Local de Trabalho',
      telefoneTrabalhoMae: 'Telefone do Trabalho',
  
      // Dados do Pai
      nomePai: 'Nome',
      nascimentoPai: 'Data de Nascimento',
      enderecoPai: 'Endereço',
      cepPai: 'CEP',
      cpfPai: 'CPF',
      rgPai: 'RG',
      profissaoPai: 'Profissão',
      telefonePai: 'Telefone',
      emailPai: 'E-mail',
      TrabalhoPai: 'Local de Trabalho',
      telefoneTrabalhoPai: 'Telefone do Trabalho',
  
      // Observações
      matriculaTipo: 'Tipo de Matrícula',
      escola: 'Escola Anterior',
      temIrmaos: 'Possui Irmãos',
      irmaosNome: 'Nomes dos Irmãos',
      temEspecialista: 'Acompanhamento Especialista',
      especialista: 'Especialista',
      temAlergias: 'Possui Alergias',
      alergia: 'Tipo de Alergia',
      temMedicamento: 'Usa Medicamento',
      medicamento: 'Medicamento Utilizado',
      reside: 'Reside Com',
      respNome: 'Responsável Financeiro',
      respTelefone: 'Contato do Responsável',
      pessoasAutorizadas: 'Pessoas Autorizadas'
    };
  
    // Fallback para campos não mapeados - formata camelCase
    return labels[key] || key
      .replace(/([A-Z])/g, ' $1') // Quebra camelCase
      .replace(/(Mae|Pai)$/gi, '') // Remove sufixos Mae/Pai
      .trim()
      .replace(/^./, (str) => str.toUpperCase()) // Capitaliza primeira letra
      .replace(/(Cpf|Cep)/gi, (match) => match.toUpperCase()); // Siglas em maiúsculo
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
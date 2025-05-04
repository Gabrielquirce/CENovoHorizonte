import { router } from 'expo-router';
import React from 'react';
import { Alert, BackHandler, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const confirmExit = () => {
    Alert.alert(
      'Sair do aplicativo',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: true }
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.headerImage}
        />
        <Text style={styles.headerTitle}>C. E. Novo Horizonte</Text>
      </View>

      {/* Conteúdo Principal */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Seção Matrícula */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.cardTitle}>Pré Matrícula</Text>
          <Text style={styles.cardSubtitle}>Cadastre os dados do aluno</Text>
        </TouchableOpacity>

        {/* Seção Gerenciamento de Matrículas */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/loginAdm')}
        >
          <Text style={styles.cardTitle}>Matrículas</Text>
          <Text style={styles.cardSubtitle}>Acompanhe os alunos pré matriculados</Text>
        </TouchableOpacity>

        {/* Seção Contatos */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/aboutInst')}
        >
          <Text style={styles.cardTitle}>Sobre a Instituição</Text>
          <Text style={styles.cardSubtitle}>Informações sobre a escola e contatos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/aboutDevs')}
        >
          <Text style={styles.cardTitle}>Sobre Nós</Text>
          <Text style={styles.cardSubtitle}>Informações sobre os desenvolvedores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={confirmExit}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#902121',
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 15,
    marginTop: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    marginTop: 30,
    alignSelf: 'center',
    padding: 10,
  },
  logoutText: {
    color: '#902121',
    fontSize: 20,
    fontWeight: 'bold',

  }
});